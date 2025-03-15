"use client";

import React, { useState } from "react";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";

type PlanType = {
  id: number;
  name: string;
  points: number;
  price: number;
  popular?: boolean;
};

const CreditsPage = () => {
  const { user } = useUserStore();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(2); // 默认选择方案（最受欢迎）
  const [paymentMethod, setPaymentMethod] = useState<string>("alipay");
  const [isProcessing, setIsProcessing] = useState(false);

  const plans: PlanType[] = [
    {
      id: 1,
      name: "基础套餐",
      points: 100,
      price: 10,
    },
    {
      id: 2,
      name: "标准套餐",
      points: 300,
      price: 25,
      popular: true,
    },
    {
      id: 3,
      name: "高级套餐",
      points: 800,
      price: 60,
    },
    {
      id: 4,
      name: "专业套餐",
      points: 2000,
      price: 120,
    },
  ];

  const handleRecharge = async () => {
    if (!selectedPlan) return;

    setIsProcessing(true);

    try {
      // 示例API调用处理支付
      // const response = await rechargePointsAction(user?.id, selectedPlan, paymentMethod);

      // 模拟API延迟
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 成功处理
      alert("积分充值成功！");
    } catch (error) {
      console.error("充值失败:", error);
      alert("积分充值失败，请重试。");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-2">积分充值</h1>
      <p className="text-gray-500 text-center mb-10">
        充值账户积分以创建高级Logo并访问更多功能
      </p>

      {/* 当前积分显示 */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">当前余额</p>
            <h2 className="text-4xl font-bold">{user?.credits || 0} 积分</h2>
          </div>
          <div className="bg-blue-500 rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 套餐选择 */}
      <h2 className="text-xl font-semibold mb-4">选择套餐</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`border rounded-xl p-6 cursor-pointer relative transition-all ${
              selectedPlan === plan.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-200"
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                最受欢迎
              </div>
            )}
            <h3 className="text-lg font-medium mb-2">{plan.name}</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-3xl font-bold">¥{plan.price}</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-600 mb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{plan.points} 积分</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>可创建 {Math.floor(plan.points / 25)} 个高级Logo</span>
            </div>
          </div>
        ))}
      </div>

      {/* 支付方式 */}
      <h2 className="text-xl font-semibold mb-4">支付方式</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div
          className={`border rounded-xl p-4 cursor-pointer flex items-center space-x-3 ${
            paymentMethod === "alipay"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200"
          }`}
          onClick={() => setPaymentMethod("alipay")}
        >
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-500 font-bold">支</span>
          </div>
          <span className="font-medium">支付宝</span>
        </div>

        <div
          className={`border rounded-xl p-4 cursor-pointer flex items-center space-x-3 ${
            paymentMethod === "wechat"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200"
          }`}
          onClick={() => setPaymentMethod("wechat")}
        >
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-500 font-bold">微</span>
          </div>
          <span className="font-medium">微信支付</span>
        </div>

        <div
          className={`border rounded-xl p-4 cursor-pointer flex items-center space-x-3 ${
            paymentMethod === "card"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200"
          }`}
          onClick={() => setPaymentMethod("card")}
        >
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-500 font-bold">卡</span>
          </div>
          <span className="font-medium">银行卡</span>
        </div>
      </div>

      {/* 订单汇总与结账 */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">订单汇总</h2>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">套餐</span>
          <span className="font-medium">
            {plans.find((p) => p.id === selectedPlan)?.name || "无"}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">积分</span>
          <span className="font-medium">
            {plans.find((p) => p.id === selectedPlan)?.points || 0}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">支付方式</span>
          <span className="font-medium">
            {paymentMethod === "alipay"
              ? "支付宝"
              : paymentMethod === "wechat"
              ? "微信支付"
              : "银行卡"}
          </span>
        </div>
        <div className="border-t border-gray-200 my-4"></div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-800 font-semibold">总计</span>
          <span className="font-bold text-xl">
            ¥{plans.find((p) => p.id === selectedPlan)?.price || 0}
          </span>
        </div>
      </div>

      <button
        className={`w-full py-4 px-6 text-white font-medium rounded-xl ${
          isProcessing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        onClick={handleRecharge}
        disabled={isProcessing || !selectedPlan}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center space-x-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>处理中...</span>
          </div>
        ) : (
          `充值 ${
            selectedPlan
              ? `¥${plans.find((p) => p.id === selectedPlan)?.price}`
              : ""
          }`
        )}
      </button>
    </div>
  );
};

export default CreditsPage;
