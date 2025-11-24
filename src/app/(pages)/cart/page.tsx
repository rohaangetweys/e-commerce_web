import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/utils/supabase/server';
import CartContent from '@/components/cart/CartContent';

export default async function CartPage() {
    const supabase = await createSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth');
    }

    return <CartContent user={user} />;
}