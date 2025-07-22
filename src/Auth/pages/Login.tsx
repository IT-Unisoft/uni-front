import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FaApple, FaFacebook, FaTelegram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { sendOtp, verifyOtp } from '@/services/authService';
import CompleteRegistration from './CompleteRegistration';
import { useNavigate } from 'react-router-dom';


const Login = ({ onNavigateBack }) => {
  const [phoneNumber, setPhoneNumber] = useState('+998');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [telegramLink, setTelegramLink] = useState('');
  const [, setBotStarted] = useState(false);
  const [showVerificationStep, setShowVerificationStep] = useState(false);
  const navigate = useNavigate();

  // Функция для проверки полноты данных пользователя
  const checkUserDataCompleteness = (user) => {
    // Проверяем основные поля пользователя
    if (!user.phone || !user.email) {
      return false;
    }

    // Проверяем наличие профиля
    if (!user.profile) {
      return false;
    }

    const profile = user.profile;

    // Проверяем обязательные поля профиля
    const requiredProfileFields = [
      'first_name',
      'last_name',
      'birth_date',
      'region_id',
      'district_id'
    ];

    return requiredProfileFields.every(field => {
      const value = profile[field];
      return value !== null && value !== undefined && value !== '';
    });
  };

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
    setErrors({});
    setTelegramLink('');

    try {
      const contact = phoneNumber.replace('+998', '');
      console.log('Sending OTP for contact:', contact);

      const response = await sendOtp(contact);
      console.log('Full API response:', response);

      if (response && response.telegram_link) {
        const telegramUrl = response.telegram_link;

        setTelegramLink(telegramUrl);
        setShowVerificationStep(true);

      } else {
        console.error('Invalid response structure:', response);
        const errorMessage = 'Не удалось получить ссылку на Telegram бота. Попробуйте еще раз.';
        setErrors({ general: errorMessage });
      }
    } catch (error) {
      console.error('Ошибка при получении Telegram ссылки:', error);
      setErrors({ general: error.message || 'Произошла ошибка. Попробуйте еще раз.' });
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
    setErrors({});

    try {
      const contact = phoneNumber.replace('+998', '');
      console.log('Verifying OTP for contact:', contact, 'with code:', verificationCode);

      const result = await verifyOtp(contact, verificationCode);
      console.log('Full verification response:', result);

      if (result && result.token && result.user) {
        console.log('Верификация успешна:', result);

        // Сохраняем токен
        localStorage.setItem('token', result.token);

        // Проверяем полноту данных пользователя
        const isUserDataComplete = checkUserDataCompleteness(result.user);

        console.log('User data completeness check:', {
          user: result.user,
          isComplete: isUserDataComplete
        });

        if (isUserDataComplete) {
          // Пользователь уже зарегистрирован полностью, сохраняем данные и переходим на главную
          localStorage.setItem('firstName', result.user.profile?.first_name || '');
          console.log('User already registered, redirecting to home page');
          navigate('/');
        } else {
          // Пользователь не завершил регистрацию, переходим на страницу завершения регистрации
          console.log('User registration incomplete, redirecting to complete registration');
          navigate('/complete-registration', {
            state: {
              userInfo: result.user,
              token: result.token,
            },
          });
        }
      } else {
        console.error('Verification failed:', result);
        const errorMessage = result?.error?.message || result?.error || 'Неверный код. Попробуйте еще раз.';
        setErrors({ verification: errorMessage });
      }
    } catch (error) {
      console.error('Ошибка при верификации:', error);
      setErrors({ verification: error.message || 'Произошла ошибка при верификации. Попробуйте еще раз.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenTelegramBot = () => {
    console.log('Opening telegram bot with link:', telegramLink);
    if (telegramLink) {
      window.open(telegramLink, '_blank');
      setBotStarted(true);
    } else {
      console.error('No telegram link available');
    }
  };

  const handleSendCodeAgain = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      const contact = phoneNumber.replace('+998', '');
      const response = await sendOtp(contact);

      if (response && response.telegram_link) {
        setTelegramLink(response.telegram_link);
        console.log('New Telegram bot link received:', response.telegram_link);
      } else {
        const errorMessage = 'Не удалось получить ссылку на Telegram бота. Попробуйте еще раз.';
        setErrors({ general: errorMessage });
      }
    } catch (error) {
      console.error('Ошибка при повторном получении ссылки:', error);
      setErrors({ general: error.message || 'Произошла ошибка. Попробуйте еще раз.' });
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

  if (showVerificationStep) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <div className="px-4 py-4 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onNavigateBack}
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
                  Enter the verification code you received from Telegram bot
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {errors.verification && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">
                        {errors.verification}
                      </AlertDescription>
                    </Alert>
                  )}

                  {errors.general && (
                    <Alert variant="destructive" className="py-2">
                      <AlertDescription className="text-sm">
                        {errors.general}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Telegram Bot Button */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <FaTelegram className="text-blue-500 w-6 h-6" />
                      <span className="text-blue-700 font-semibold text-lg">Open Telegram Bot</span>
                    </div>
                    <p className="text-blue-600 text-sm mb-4">
                      Click the button below to open Telegram bot and get your verification code for{' '}
                      <span className="font-medium">{phoneNumber}</span>
                    </p>

                    <Button
                      onClick={handleOpenTelegramBot}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold h-12"
                      disabled={!telegramLink || telegramLink.trim() === ''}
                    >
                      <FaTelegram className="w-5 h-5 mr-2" />
                      {telegramLink ? 'Open Telegram Bot' : 'Waiting for link...'}
                    </Button>
                  </div>

                  <Input
                    type="text"
                    value={verificationCode}
                    onChange={handleCodeChange}
                    placeholder="Enter verification code from Telegram"
                    className="h-14 text-center text-lg tracking-widest"
                    maxLength={6}
                  />

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={handleSendCodeAgain}
                      disabled={isLoading}
                      className="flex-1 h-14 font-semibold text-base"
                    >
                      {isLoading ? 'Getting link...' : 'Get new code'}
                    </Button>
                    <Button
                      onClick={handleContinue}
                      disabled={verificationCode.length !== 6 || isLoading}
                      className="flex-1 h-14 bg-[#A84B31] text-white font-semibold text-base disabled:opacity-50"
                    >
                      {isLoading ? 'Verifying...' : 'Continue'}
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="">
        <div className="px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onNavigateBack}
            className="rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-[#A84B31]" />
          </Button>

          <div className="w-[300px] flex flex-col justify-center items-center gap-4">
            <div className="w-[200px] h-[60px] rounded flex items-center justify-center">
              <div className="w-12 h-12 bg-[#A84B31] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">XH</span>
              </div>
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
                {errors.general && (
                  <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">
                      {errors.general}
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

export default Login;