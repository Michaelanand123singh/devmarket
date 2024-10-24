import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context and hooks/CartContext';
import { ThemeProvider } from './context and hooks/ThemeContext';
import { AuthProvider } from './context and hooks/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout and Common Components
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';
import PrivateRoute from './components/PrivateRoute';
import AuthGuard from './context and hooks/AuthGuard';

// Lazy load all pages and major components for better performance
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));


// Lazy load homepage sections
const Testimonials = lazy(() => import('./components/home/Testimonials'));
const HowItWorks = lazy(() => import('./components/home/HowItWorks'));
const NewsletterSignup = lazy(() => import('./components/home/NewsLetterSignup'));
const CallToAction = lazy(() => import('./components/home/CallToAction'));

// Loading fallback components
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size="large" />
  </div>
);

const ComponentLoader = () => (
  <div className="flex items-center justify-center py-12">
    <LoadingSpinner size="medium" />
  </div>
);

// Error Fallback Component
const ErrorFallback = ({ error }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
    <p className="text-gray-600 mb-4">{error.message}</p>
    <button 
      onClick={() => window.location.reload()}
      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
    >
      Reload Page
    </button>
  </div>
);

// HomePage Component with Suspense boundaries for each section
const HomePage = () => (
  <>
    <Suspense fallback={<ComponentLoader />}>
      <HowItWorks />
    </Suspense>
    
    <Suspense fallback={<ComponentLoader />}>
      <Testimonials />
    </Suspense>
    
    <Suspense fallback={<ComponentLoader />}>
      <NewsletterSignup />
    </Suspense>
    
    <Suspense fallback={<ComponentLoader />}>
      <CallToAction />
    </Suspense>
  </>
);



const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              <Layout>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/search" element={<Products />} />
                    <Route path="/category/:category" element={<Products />} />
                    
                    {/* Authentication Routes */}
                    <Route
                      path="/login"
                      element={
                        <AuthGuard>
                          <Login />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="/register"
                      element={
                        <AuthGuard>
                          <Register />
                        </AuthGuard>
                      }
                    />
                    <Route
                      path="/forgot-password"
                      element={
                        <AuthGuard>
                          <ForgotPassword />
                        </AuthGuard>
                      }
                    />
                    
                    {/* Protected Routes */}
                    <Route
                      path="/profile"
                      element={
                        <PrivateRoute>
                          <Profile />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/cart"
                      element={
                        <PrivateRoute>
                          <Cart />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/checkout"
                      element={
                        <PrivateRoute>
                          <Checkout />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/order-success"
                      element={
                        <PrivateRoute>
                          <OrderSuccess />
                        </PrivateRoute>
                      }
                    />
                    
                    {/* 404 Route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>

                {/* Toast Notifications */}
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </Layout>
            </Router>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;