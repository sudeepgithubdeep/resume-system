import { useState } from 'react';
import { Check, CreditCard, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import toast from 'react-hot-toast';

interface SubscriptionScreenProps {
  onComplete: () => void;
}

const SubscriptionScreen = ({ onComplete }: SubscriptionScreenProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Get started and send to 10 companies',
      features: [
        'Send to 10 companies',
        'Basic resume tracking',
        'Email notifications',
        '7-day history'
      ],
      recommended: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9.99',
      period: '/month',
      description: 'Maximize your reach and get AI feedback',
      features: [
        'Send to 50 companies',
        'AI Resume Check',
        'Advanced tracking',
        '30-day history',
        'Priority support'
      ],
      recommended: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$19.99',
      period: '/month',
      description: 'Ultimate access for serious job seekers',
      features: [
        'Unlimited companies',
        'Advanced AI Resume Enhancement',
        'Real-time tracking',
        'Unlimited history',
        'Priority support',
        'Interview preparation tools'
      ],
      recommended: false
    }
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    if (planId === 'free') {
      toast.success('Free plan selected!', {
        icon: '✅',
        style: {
          background: '#10B981',
          color: '#fff',
        }
      });
      setTimeout(() => {
        onComplete();
      }, 1000);
    } else {
      toast(`${planId === 'pro' ? 'Pro' : 'Premium'} plan selected!`, {
        icon: '⭐',
      });
      setShowPayment(true);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process the payment
    toast.success('Payment successful!', {
      duration: 3000,
      icon: '💳',
      style: {
        background: '#10B981',
        color: '#fff',
      }
    });
    
    setTimeout(() => {
      toast('Redirecting to dashboard...', {
        icon: '🚀',
      });
      setTimeout(() => {
        onComplete();
      }, 1000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-medium text-center text-[#495057] mb-3">
          Choose Your Plan
        </h1>
        
        <p className="text-center text-[#868E96] mb-8">
          Select the plan that best suits your job search needs and let us help you reach more companies.
        </p>
        
        {!showPayment ? (
          <>
            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`overflow-hidden transform transition-all hover:scale-105 ${
                    plan.recommended ? 'border-[#50A7F9] shadow-md' : ''
                  }`}
                >
                  {plan.recommended && (
                    <div className="bg-[#50A7F9] text-white text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">{plan.name}</CardTitle>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-[#495057]">{plan.price}</span>
                      <span className="text-[#868E96]">{plan.period}</span>
                    </div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-[#50A7F9] mr-2 flex-shrink-0" />
                          <span className="text-[#495057]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={plan.recommended ? "lightBlue" : "outline"}
                      size="full"
                      onClick={() => handleSelectPlan(plan.id)}
                      className="transform transition-all hover:shadow-md active:scale-95"
                    >
                      {plan.id === 'free' ? 'Get Started' : `Choose ${plan.name}`}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {/* Features Comparison Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm p-4 mb-8">
              <h2 className="text-xl font-medium text-[#495057] mb-4">Features Comparison</h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-[#495057]">Feature</th>
                    <th className="text-center py-3 px-4 font-medium text-[#495057]">Free</th>
                    <th className="text-center py-3 px-4 font-medium text-[#495057]">Pro</th>
                    <th className="text-center py-3 px-4 font-medium text-[#495057]">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-[#495057]">Companies</td>
                    <td className="text-center py-3 px-4 text-[#868E96]">10</td>
                    <td className="text-center py-3 px-4 text-[#868E96]">50</td>
                    <td className="text-center py-3 px-4 text-[#868E96]">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-[#495057]">Resume Check</td>
                    <td className="text-center py-3 px-4 text-[#868E96]">Basic</td>
                    <td className="text-center py-3 px-4 text-[#868E96]">AI Enhanced</td>
                    <td className="text-center py-3 px-4 text-[#868E96]">Advanced AI</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-[#495057]">History</td>
                    <td className="text-center py-3 px-4 text-[#868E96]">7 days</td>
                    <td className="text-center py-3 px-4 text-[#868E96]">30 days</td>
                    <td className="text-center py-3 px-4 text-[#868E96]">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 text-[#495057]">Support</td>
                    <td className="text-center py-3 px-4 text-[#868E96]">Email</td>
                    <td className="text-center py-3 px-4 text-[#868E96]">Priority</td>
                    <td className="text-center py-3 px-4 text-[#868E96]">Priority</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-[#495057]">Interview Tools</td>
                    <td className="text-center py-3 px-4 text-[#868E96]">-</td>
                    <td className="text-center py-3 px-4 text-[#868E96]">-</td>
                    <td className="text-center py-3 px-4 text-[#868E96]">
                      <Check className="h-5 w-5 text-[#50A7F9] mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          // Payment Form
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 transform transition-all animate-fadeIn">
            <h2 className="text-xl font-medium text-[#495057] mb-4">Payment Details</h2>
            <div className="mb-4 p-3 bg-gray-50 rounded-md">
              <p className="text-[#495057] font-medium">
                {selectedPlan === 'pro' ? 'Pro Plan' : 'Premium Plan'}
              </p>
              <p className="text-[#868E96]">
                {selectedPlan === 'pro' ? '$9.99/month' : '$19.99/month'}
              </p>
            </div>
            
            <form onSubmit={handlePaymentSubmit}>
              <div className="mb-4">
                <label className="block text-[#495057] text-sm font-medium mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#50A7F9] focus:border-transparent transition-all"
                  />
                  <CreditCard className="absolute right-3 top-3 h-5 w-5 text-[#868E96]" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[#495057] text-sm font-medium mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#50A7F9] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[#495057] text-sm font-medium mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#50A7F9] focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-[#495057] text-sm font-medium mb-2">
                  Name on Card
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#50A7F9] focus:border-transparent transition-all"
                />
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center text-sm text-[#868E96]">
                  <Lock className="h-4 w-4 mr-1" />
                  Secure Payment
                </div>
                <div className="text-sm text-[#868E96]">
                  Powered by Stripe
                </div>
              </div>
              
              <Button
                type="submit"
                variant="lightBlue"
                size="full"
                className="transform transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                {selectedPlan === 'pro' ? 'Pay $9.99 Now' : 'Pay $19.99 Now'}
              </Button>
              
              <button
                type="button"
                className="w-full text-center mt-4 text-[#868E96] hover:text-[#495057] transition-colors"
                onClick={() => setShowPayment(false)}
              >
                Back to Plans
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionScreen;
