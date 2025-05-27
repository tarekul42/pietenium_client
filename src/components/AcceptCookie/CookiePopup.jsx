// components/CookiePopup.jsx
'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import styles from './cookiePopup.module.css';
import { api } from '@/data/api';
import SmallLoad from '../smallLaoding/smallLoad';

export default function CookiePopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [accLoading, setAccLoading] = useState(false);
  const [disLoading, setDisLoading] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookie_accepted');
    if (!consent) {
      setShowPopup(true);
    }
  }, []);

  const sendConsentData = async (data) => {
    try {
      await fetch(`${api}/userRecord`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error('Consent data sending failed:', err);
    }
  };

  const handleAccept = async () => {
    setAccLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await sendConsentData({ lat: latitude, lng: longitude });
        Cookies.set('cookie_accepted', 'true', { expires: 30 });
        setShowPopup(false);
        setAccLoading(false);
      },
      async () => {
        await sendConsentData({});
        Cookies.set('cookie_accepted', 'true', { expires: 30 });
        setShowPopup(false);
        setAccLoading(false);
      }
    );
  };

  const handleDecline = async () => {
    setDisLoading(true);
    await sendConsentData({});
    Cookies.set('cookie_accepted', 'true', { expires: 30 });
    setShowPopup(false);
    setDisLoading(false);
  };

  if (!showPopup) return null;

  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popupBox}>
        <h4>🍪 PieTech Cookie Consent</h4>
        <p>
          We use cookies to improve your experience and analyze traffic on PieTech.
          By clicking "Accept", you consent to our cookie policy. To learn more, see our full policy.
        </p>
        <div className={styles.buttonGroup}>
          <button className={styles.acceptBtn} onClick={handleAccept} disabled={accLoading}>
            {accLoading ? <SmallLoad/> : 'Accept'}
          </button>
          <button className={styles.declineBtn} onClick={handleDecline} disabled={disLoading}>
            {disLoading ? <SmallLoad/> : 'Decline'}
          </button>
        </div>
      </div>
    </div>
  );
}  
