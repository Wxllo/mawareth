import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { Loader2, User, Briefcase } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';

const Auth: React.FC = () => {
  const { language } = useLanguage();
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const isArabic = language === 'ar';

  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    role: 'heir' as 'heir' | 'investor' | 'admin'
  });

  const content = {
    en: {
      login: 'Login',
      signup: 'Sign Up',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      name: 'Full Name',
      phone: 'Phone Number',
      role: 'I am a...',
      heir: 'Family Heir',
      heirDesc: 'I inherited property',
      investor: 'Investor',
      investorDesc: 'I want to invest',
      loginBtn: 'Sign In',
      signupBtn: 'Create Account',
      loginDesc: 'Welcome back! Sign in to your account.',
      signupDesc: 'Create your account to get started.',
      passwordMismatch: 'Passwords do not match',
      loginSuccess: 'Welcome back!',
      signupSuccess: 'Account created successfully!',
      loginError: 'Login failed',
      signupError: 'Signup failed'
    },
    ar: {
      login: 'تسجيل الدخول',
      signup: 'إنشاء حساب',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      name: 'الاسم الكامل',
      phone: 'رقم الهاتف',
      role: 'أنا...',
      heir: 'وريث عائلة',
      heirDesc: 'ورثت عقاراً',
      investor: 'مستثمر',
      investorDesc: 'أريد الاستثمار',
      loginBtn: 'دخول',
      signupBtn: 'إنشاء حساب',
      loginDesc: 'مرحباً بعودتك! سجل دخولك.',
      signupDesc: 'أنشئ حسابك للبدء.',
      passwordMismatch: 'كلمات المرور غير متطابقة',
      loginSuccess: 'مرحباً بعودتك!',
      signupSuccess: 'تم إنشاء الحساب بنجاح!',
      loginError: 'فشل تسجيل الدخول',
      signupError: 'فشل إنشاء الحساب'
    }
  };

  const t = content[language];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(loginData.email, loginData.password);

    if (result.success) {
      toast({ title: t.loginSuccess });
      navigate('/dashboard');
    } else {
      toast({ title: t.loginError, description: result.error, variant: 'destructive' });
    }

    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      toast({ title: t.passwordMismatch, variant: 'destructive' });
      return;
    }

    setIsLoading(true);

    const result = await signup({
      email: signupData.email,
      password: signupData.password,
      name: signupData.name,
      phone: signupData.phone,
      role: signupData.role
    });

    if (result.success) {
      toast({ title: t.signupSuccess });
      navigate('/dashboard');
    } else {
      toast({ title: t.signupError, description: result.error, variant: 'destructive' });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <Tabs defaultValue="login">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">{t.login}</TabsTrigger>
                <TabsTrigger value="signup">{t.signup}</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="login">
                <CardTitle className="text-xl mb-2">{t.login}</CardTitle>
                <CardDescription className="mb-6">{t.loginDesc}</CardDescription>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">{t.email}</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      dir="ltr"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">{t.password}</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      dir="ltr"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : t.loginBtn}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <CardTitle className="text-xl mb-2">{t.signup}</CardTitle>
                <CardDescription className="mb-6">{t.signupDesc}</CardDescription>
                
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">{t.name}</Label>
                    <Input
                      id="signup-name"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">{t.email}</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">{t.phone}</Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      value={signupData.phone}
                      onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                      required
                      dir="ltr"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">{t.password}</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">{t.confirmPassword}</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                      required
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>{t.role}</Label>
                    <RadioGroup
                      value={signupData.role}
                      onValueChange={(value: 'heir' | 'investor') => setSignupData({ ...signupData, role: value })}
                      className="grid grid-cols-2 gap-4"
                    >
                      <Label
                        htmlFor="role-heir"
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          signupData.role === 'heir' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem value="heir" id="role-heir" className="sr-only" />
                        <User className="h-6 w-6 text-primary" />
                        <span className="font-medium">{t.heir}</span>
                        <span className="text-xs text-muted-foreground text-center">{t.heirDesc}</span>
                      </Label>
                      
                      <Label
                        htmlFor="role-investor"
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          signupData.role === 'investor' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem value="investor" id="role-investor" className="sr-only" />
                        <Briefcase className="h-6 w-6 text-primary" />
                        <span className="font-medium">{t.investor}</span>
                        <span className="text-xs text-muted-foreground text-center">{t.investorDesc}</span>
                      </Label>
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : t.signupBtn}
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </main>

      <AppFooter />
    </div>
  );
};

export default Auth;
