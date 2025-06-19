import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FaApple, FaFacebook } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import Logo from '@/assets/Logo.svg'
import CompleteRegistration from './CompleteRegistration';

interface LoginState {
  phoneNumber: string;
  isLoading: boolean;
  errors: { [key: string]: string };
}

const IntegratedAuthFlow = () => {
  const [currentStep, setCurrentStep] = useState<'login' | 'verification' | 'otherOptions' | 'completeRegistration'>('login');
  const [phoneNumber, setPhoneNumber] = useState('+998');
  const [verificationCode, setVerificationCode] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('SMS');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    if (field === 'phoneNumber') {
      setPhoneNumber(value);
    }
    setErrors(prev => ({
      ...prev,
      [field]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!phoneNumber.trim() || phoneNumber === '+998') {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+998\d{9}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid Uzbek phone number (+998XXXXXXXXX)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');

    if (numbers.startsWith('998')) {
      return `+${numbers.slice(0, 12)}`;
    }

    if (numbers.length > 0 && !numbers.startsWith('998')) {
      return `+998${numbers.slice(0, 9)}`;
    }

    return '+998';
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    handleInputChange('phoneNumber', formatted);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCurrentStep('verification');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setVerificationCode(value);
  };

  const handleContinue = async () => {
    if (verificationCode.length !== 6) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Verification successful');
      setCurrentStep('completeRegistration');
    } finally {
      setIsLoading(false);
    }
  };


  const handleSendCodeAgain = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Code sent via ${selectedMethod}`);
      setCurrentStep('verification');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login clicked`);
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked');
  };

  // Функция для возврата назад
  const handleBack = () => {
    if (currentStep === 'verification') {
      setCurrentStep('login');
    } else if (currentStep === 'otherOptions') {
      setCurrentStep('verification');
    }
  };

  if (currentStep === 'completeRegistration') {
    return <CompleteRegistration />;
  }


  // Рендер экрана "Other options"
  if (currentStep === 'otherOptions') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="px-4 py-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <Card className="w-full max-w-[500px] border-0 shadow-lg">
            <CardHeader className="pb-6">
              <h1 className="text-[32px] font-medium text-gray-900 mb-4">
                Other options
              </h1>
              <p className="text-gray-600 text-[16px] leading-6">
                Choose another way to get the code to the number{' '}
                <span className="text-[#A84B31]">{phoneNumber}</span>
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* SMS Option */}
              <div
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${selectedMethod === 'SMS' ? 'border-[#A84B31] bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                onClick={() => setSelectedMethod('SMS')}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 mr-4">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-gray-500 text-sm mb-1">We will send you the code</p>
                  <p className="text-gray-900 font-medium text-lg">SMS</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'SMS' ? 'border-[#A84B31]' : 'border-gray-300'
                  }`}>
                  {selectedMethod === 'SMS' && (
                    <div className="w-3 h-3 rounded-full bg-[#A84B31]"></div>
                  )}
                </div>
              </div>

              {/* Telegram Option */}
              <div
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${selectedMethod === 'Telegram' ? 'border-[#A84B31] bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                onClick={() => setSelectedMethod('Telegram')}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 mr-4">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-gray-500 text-sm mb-1">We will send your code via Wi-Fi</p>
                  <p className="text-gray-900 font-medium text-lg">Telegram</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'Telegram' ? 'border-[#A84B31]' : 'border-gray-300'
                  }`}>
                  {selectedMethod === 'Telegram' && (
                    <div className="w-3 h-3 rounded-full bg-[#A84B31]"></div>
                  )}
                </div>
              </div>

              {/* Phone Call Option */}
              <div
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${selectedMethod === 'Phone call' ? 'border-[#A84B31] bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                onClick={() => setSelectedMethod('Phone call')}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 mr-4">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-gray-500 text-sm mb-1">We will call you and give you the code</p>
                  <p className="text-gray-900 font-medium text-lg">Phone call</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'Phone call' ? 'border-[#A84B31]' : 'border-gray-300'
                  }`}>
                  {selectedMethod === 'Phone call' && (
                    <div className="w-3 h-3 rounded-full bg-[#A84B31]"></div>
                  )}
                </div>
              </div>

              <Button
                onClick={handleSendCodeAgain}
                disabled={isLoading}
                className="w-full h-14 bg-[#A84B31] text-white font-semibold text-base mt-8"
              >
                {isLoading ? 'Sending...' : 'Send the code again'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Рендер экрана верификации
  if (currentStep === 'verification') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="px-4 py-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <Card className="w-full max-w-[500px] border-0 shadow-lg">
            <CardHeader className="pb-6">
              <h1 className="text-[32px] font-medium text-gray-900 mb-4">
                Confirm your phone number
              </h1>
              <p className="text-gray-600 text-[16px] leading-6">
                We have sent a confirmation code to the number{' '}
                <span className="text-[#A84B31]">{phoneNumber}</span>
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Input
                  type="text"
                  value={verificationCode}
                  onChange={handleCodeChange}
                  placeholder="Write confirmation code"
                  className="h-14 text-center text-lg tracking-widest"
                  maxLength={6}
                />

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep('otherOptions')}
                    className="flex-1 h-14 font-semibold text-base"
                  >
                    Other options
                  </Button>
                  <Button
                    onClick={handleContinue}
                    disabled={verificationCode.length !== 6 || isLoading}
                    className="flex-1 h-14 bg-[#A84B31] text-white font-semibold text-base disabled:opacity-50"
                  >
                    {isLoading ? 'Loading...' : 'Continue'}
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                className="w-full relative h-14 font-semibold text-base"
              >
                <span className='absolute left-5'>
                  <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </span>
                Sign in with Google
              </Button>

              <div className="flex items-center justify-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleSocialLogin('Facebook')}
                  className="bg-transparent border-none shadow-none"
                >
                  <FaFacebook className='text-blue-700 w-8 h-8' />
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleSocialLogin('Apple')}
                  className="bg-transparent border-none shadow-none"
                >
                  <FaApple className='w-8 h-8' />
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleSocialLogin('Email')}
                  className="bg-transparent border-none shadow-none"
                >
                  <MdOutlineEmail className='w-8 h-8' />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Рендер исходного экрана логина (ваш оригинальный код)
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="">
        <div className="px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => console.log('Navigate back')}
            className="rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-[#A84B31]" />
          </Button>

          <div className="w-[300px] flex flex-col justify-center items-center gap-4">
            <div className="w-[200px] h-[60px] rounded flex items-center justify-center">
              <img src={Logo} alt="" />
            </div>
            <h2 className='text-[16px] font-medium text-[#A84B31]'>"Xarid Home Xizmat"ga hush kelibsiz.</h2>
          </div>

          <div className="w-10"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-[500px] border-0 shadow-lg">
          <CardHeader className="pb-8">
            <div>
              <h1 className="text-[30px] font-medium text-gray-900 mb-3">
                Sign in or create an account
              </h1>
              <p className="text-[#242424] text-[14px] leading-5">
                The most convenient locations and low prices in Uzbekistan
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="sr-only">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="Write your phone number"
                  className={`h-14 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                />
                {errors.phoneNumber && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">
                      {errors.phoneNumber}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <Button
                onClick={handleLoginSubmit}
                disabled={isLoading}
                className="w-full h-14 bg-[#A84B31] text-white font-semibold text-base"
              >
                {isLoading ? 'Loading...' : 'Continue'}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-full relative h-14 font-semibold text-base"
            >
              <span className='absolute left-5'>
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </span>
              Sign in with Google
            </Button>

            <div className="flex items-center justify-center gap-4">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleSocialLogin('Facebook')}
                className="bg-transparent border-none shadow-none"
              >
                <FaFacebook className='text-blue-700 w-8 h-8' />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleSocialLogin('Apple')}
                className="bg-transparent border-none shadow-none"
              >
                <FaApple className='w-8 h-8' />
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleSocialLogin('Email')}
                className="bg-transparent border-none shadow-none"
              >
                <MdOutlineEmail className='w-8 h-8' />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IntegratedAuthFlow;