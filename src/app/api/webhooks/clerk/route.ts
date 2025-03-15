

import { createUserAction, updateUserAction } from "@/actions/user/user-actions"
import { WebhookEvent } from "@clerk/nextjs/server"
import { headers } from "next/headers"
import { Webhook } from "svix"

export async function POST(req: Request) {
    const headerPayload = await headers()
    const svixId = headerPayload.get("svix-id")
    const svixTimestamp = headerPayload.get("svix-timestamp")
    const svixSignature = headerPayload.get("svix-signature")

    if (!svixId || !svixTimestamp || !svixSignature) {
        return new Response("Error occurred -- no svix headers", {
            status: 400,
        })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET as string)
    let event: WebhookEvent

    try {
        event = wh.verify(body, {
            "svix-id": svixId,
            "svix-timestamp": svixTimestamp,
            "svix-signature": svixSignature,
        }) as WebhookEvent
    } catch (err) {
        console.error("Error verifying webhook:", err)
        return new Response("Error occurred", {
            status: 400,
        })
    }

    console.log(event.type, "event.type")


    if (event.type === "user.created") {
        const email = event.data.email_addresses.find(
            email => email.id === event.data.primary_email_address_id
        )?.email_address
        const name = `${event.data.first_name} ${event.data.last_name}`.trim()
        if (email == null) return new Response("No email", { status: 400 })
        if (name === "") return new Response("No name", { status: 400 })

        await createUserAction({
            clerkUserId: event.data.id,
            email,
            name,
            imageUrl: event.data.image_url,
            credits: 0,
            deletedAt: null
        })
    } else if (event.type === "user.updated") {
        const email = event.data.email_addresses.find(
            email => email.id === event.data.primary_email_address_id
        )?.email_address
        const name = `${event.data.first_name} ${event.data.last_name}`.trim()
        if (email == null) return new Response("No email", { status: 400 })
        if (name === "") return new Response("No name", { status: 400 })

        await updateUserAction(
            event.data.id,
            {
                email,
                name,
                imageUrl: event.data.image_url,

            }
        )
    }

    return new Response("", { status: 200 })
}
