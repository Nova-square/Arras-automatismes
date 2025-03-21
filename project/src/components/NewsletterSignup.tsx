import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) throw error;

      setStatus('success');
      setMessage('Inscription réussie ! Merci de votre intérêt.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <section className="py-16 px-4 bg-[#003366]">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-white font-montserrat">
          Restez informé
        </h2>
        <p className="text-xl mb-8 text-white font-open-sans">
          Recevez nos derniers articles et conseils directement dans votre boîte mail
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-4">
            <div className="relative flex-grow">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Votre email"
                className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6600] font-open-sans"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#ff6600] text-white px-6 py-3 rounded-lg hover:bg-[#e65c00] transition-colors font-open-sans disabled:opacity-50"
            >
              S'inscrire
            </button>
          </div>
          {status === 'success' && (
            <div className="mt-4 flex items-center justify-center text-green-400">
              <CheckCircle className="w-5 h-5 mr-2" />
              {message}
            </div>
          )}
          {status === 'error' && (
            <div className="mt-4 flex items-center justify-center text-red-400">
              <AlertCircle className="w-5 h-5 mr-2" />
              {message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}