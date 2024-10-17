import React, { useState, useEffect } from 'react';
import { RefreshCw, CurrencyWon, CurrencyYen } from 'lucide-react';

function App() {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const amount = 10000; // 设置兑换金额为10000韩币

  const fetchExchangeRate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/KRW');
      const data = await response.json();
      setExchangeRate(data.rates.CNY);
    } catch (err) {
      setError('获取汇率失败。请稍后再试。');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">韩元兑人民币汇率</h1>
        <div className="flex justify-center items-center space-x-4 mb-6">
          <CurrencyWon className="text-blue-500" size={32} />
          <span className="text-2xl font-semibold">=&gt;</span>
          <CurrencyYen className="text-green-500" size={32} />
        </div>
        {loading ? (
          <p className="text-center text-gray-600">正在加载汇率...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800 mb-2">
              {amount} 韩元 = {(amount * (exchangeRate || 0)).toFixed(2)} 人民币
            </p>
            <p className="text-gray-600">
              1 韩元 = {exchangeRate?.toFixed(4)} 人民币
            </p>
          </div>
        )}
        <button
          onClick={fetchExchangeRate}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300"
        >
          <RefreshCw className="mr-2" size={20} />
          刷新汇率
        </button>
      </div>
    </div>
  );
}

export default App;