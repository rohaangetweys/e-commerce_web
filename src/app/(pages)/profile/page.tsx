import ProfileContent from '@/components/profile/ProfileContent';
import { createSupabaseServer } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
    const supabase = await createSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth');
    }

    const { data: profile } = await supabase
        .from('users')
        .select('full_name')
        .eq('id', user.id)
        .single();

    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    return <ProfileContent user={user} profile={profile} orders={orders || []} />;
}