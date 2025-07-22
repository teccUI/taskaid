import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain uppercase, lowercase, number, and special character'),
  terms: z.boolean().refine(val => val === true, 'You must accept the terms')
});

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required')
});

type SignUpFormData = z.infer<typeof signUpSchema>;
type SignInFormData = z.infer<typeof signInSchema>;

export default function LandingPage() {
  const [, setIsSignUpOpen] = useState(false);
  const [, setIsSignInOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSignUp = async (data: SignUpFormData) => {
    setLoading(true);
    try {
      await signUp(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSignIn = async (data: SignInFormData) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(signUpForm.watch('password') || '');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="font-bold text-xl">TaskAid</div>
          <div className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" onClick={() => setIsSignInOpen(true)}>
                  Log In
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log In</DialogTitle>
                </DialogHeader>
                <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Email"
                      type="email"
                      {...signInForm.register('email')}
                    />
                    {signInForm.formState.errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {signInForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      placeholder="Password"
                      type="password"
                      {...signInForm.register('password')}
                    />
                    {signInForm.formState.errors.password && (
                      <p className="text-sm text-red-500 mt-1">
                        {signInForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Logging in...' : 'Log In'}
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">
                    New here?{' '}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsSignInOpen(false);
                        setIsSignUpOpen(true);
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={() => setIsSignUpOpen(true)}>
                  Get Started
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign Up</DialogTitle>
                </DialogHeader>
                <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Email"
                      type="email"
                      {...signUpForm.register('email')}
                    />
                    {signUpForm.formState.errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {signUpForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      placeholder="Password"
                      type="password"
                      {...signUpForm.register('password')}
                    />
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-2 flex-1 rounded ${
                            passwordStrength >= level ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    {signUpForm.formState.errors.password && (
                      <p className="text-sm text-red-500 mt-1">
                        {signUpForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...signUpForm.register('terms')}
                      className="rounded"
                    />
                    <label className="text-sm">
                      I accept Terms & Privacy
                    </label>
                  </div>
                  {signUpForm.formState.errors.terms && (
                    <p className="text-sm text-red-500">
                      {signUpForm.formState.errors.terms.message}
                    </p>
                  )}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                  <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsSignUpOpen(false);
                        setIsSignInOpen(true);
                      }}
                    >
                      Log In
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Organize your tasks, amplify your productivity
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              TaskAid helps you manage your tasks with smart buckets and intuitive workflows. 
              Stay organized, never miss a deadline, and achieve more every day.
            </p>
            <Button size="lg" onClick={() => setIsSignUpOpen(true)}>
              Get Started Free
            </Button>
          </div>
          <div className="bg-muted rounded-lg h-80 flex items-center justify-center">
            <div className="text-muted-foreground">Product Demo</div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground mb-8">
            Trusted by productive teams everywhere
          </p>
          <div className="flex justify-center gap-8 opacity-50">
            <div>Company A</div>
            <div>Company B</div>
            <div>Company C</div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Smart Buckets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Organize related tasks together with customizable buckets that keep you focused.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Due Date Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Never miss a deadline with intelligent due date reminders and priority sorting.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Track your productivity patterns and maintain momentum with detailed insights.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-muted rounded-lg py-16">
          <h2 className="text-2xl font-bold mb-4">Ready to boost your productivity?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of users who organize their work with TaskAid
          </p>
          <Button size="lg" onClick={() => setIsSignUpOpen(true)}>
            Start Free Today
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-20">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 TaskAid. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-foreground">About</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}