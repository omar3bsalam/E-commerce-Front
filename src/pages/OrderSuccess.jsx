import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  const defaultOrder = {
    orderNumber: 'ORD-123456789',
    totalAmount: 5297.97,
    shippingCost: 12.99,
    taxAmount: 45.60,
    items: [
      {
        name: 'MacBook Pro 16-inch',
        price: 3499.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop'
      },
      {
        name: 'Apple Watch Ultra 2',
        price: 799.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop'
      }
    ],
    shippingAddress: {
      name: 'John Customer',
      street: '456 Customer Ave',
      city: 'New York',
      country: 'USA',
      zipCode: '10002',
      phone: '+1234567891'
    },
    paymentMethod: 'credit_card',
    orderStatus: 'confirmed'
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrder(defaultOrder);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="order-success-container">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">جاري تحميل تفاصيل الطلب...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success-container">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card success-header-card mb-5">
              <div className="card-body text-center p-5">
                <div className="success-animation mb-4">
                  <div className="success-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                </div>
                
                <h1 className="display-5 fw-bold text-success mb-3">تم تأكيد طلبك بنجاح!</h1>
                <p className="lead mb-4">
                  شكراً لاختيارك متجرنا. تم استلام طلبك وسيتم تجهيزه للشحن قريباً.
                </p>
                
                <div className="order-number-badge">
                  <span className="badge bg-light text-dark fs-6 p-3">
                    <i className="fas fa-receipt me-2"></i>
                    رقم الطلب: <strong>{order.orderNumber}</strong>
                  </span>
                </div>
              </div>
            </div>
            <div className="card next-steps-card mt-4">
              <div className="card-body text-center">
                <h5 className="mb-4">
                  <i className="fas fa-rocket me-2 text-primary"></i>
                  ماذا بعد؟
                </h5>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="step-card">
                      <div className="step-icon-wrapper text-primary">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div className="step-content">
                        <h6 className="fw-bold">إشعار البريد الإلكتروني</h6>
                        <p className="text-muted small">سيصلك تأكيد بالبريد الإلكتروني</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="step-card">
                      <div className="step-icon-wrapper text-warning">
                        <i className="fas fa-box-open"></i>
                      </div>
                      <div className="step-content">
                        <h6 className="fw-bold">تجهيز الطلب</h6>
                        <p className="text-muted small">سيتم تجهيز طلبك خلال 24 ساعة</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="step-card">
                      <div className="step-icon-wrapper text-info">
                        <i className="fas fa-shipping-fast"></i>
                      </div>
                      <div className="step-content">
                        <h6 className="fw-bold">تتبع الشحن</h6>
                        <p className="text-muted small">تتبع طلبك عندما يبدأ الشحن</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-5">
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Link to="/products" className="btn btn-primary btn-lg px-4 py-3 action-btn">
                  <i className="fas fa-shopping-bag me-2"></i>
                  مواصلة التسوق
                </Link>
                <Link to="/cart" className="btn btn-outline-primary btn-lg px-4 py-3 action-btn">
                  <i className="fas fa-list-alt me-2"></i>
                  عرض طلباتي
                </Link>
                <Link to="/" className="btn btn-outline-secondary btn-lg px-4 py-3 action-btn">
                  <i className="fas fa-home me-2"></i>
                  الصفحة الرئيسية
                </Link>
              </div>
              
              <div className="mt-4">
                <small className="text-muted">
                  لديك استفسار؟ 
                  <Link to="/contact" className="text-decoration-none ms-1">
                    اتصل بفريق الدعم
                  </Link>
                </small>
              </div>
            </div>

            <div className="card support-card mt-4">
              <div className="card-body text-center">
                <h6 className="mb-4">
                  <i className="fas fa-headset me-2 text-primary"></i>
                  نحن هنا لمساعدتك
                </h6>
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="support-item">
                      <i className="fas fa-envelope text-primary mb-2"></i>
                      <small className="fw-semibold d-block">البريد الإلكتروني</small>
                      <small className="text-muted">support@elitestore.com</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="support-item">
                      <i className="fas fa-phone text-primary mb-2"></i>
                      <small className="fw-semibold d-block">رقم الهاتف</small>
                      <small className="text-muted">+1 (555) 123-4567</small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="support-item">
                      <i className="fas fa-clock text-primary mb-2"></i>
                      <small className="fw-semibold d-block">ساعات العمل</small>
                      <small className="text-muted">24/7</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;