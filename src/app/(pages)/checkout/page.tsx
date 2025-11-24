import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/utils/supabase/server';
import CheckoutContent from '@/components/checkout/CheckoutContent';

export default async function CheckoutPage() {
    const supabase = await createSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth');
    }

    return <CheckoutContent user={user} />;
}