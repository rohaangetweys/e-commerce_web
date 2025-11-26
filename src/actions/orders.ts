'use server'
import { createSupabaseServer } from "@/utils/supabase/server";

export interface OrderItem {
    id: string;
    name: string;
    price: number;
    main_img_url: string;
    slug: string;
    quantity: number;
    sku: string;
}

export interface CreateOrderData {
    email: string;
    phone?: string;
    shipping_first_name: string;
    shipping_last_name: string;
    shipping_address: string;
    shipping_city: string;
    shipping_state: string;
    shipping_zip: string;
    shipping_country: string;
    shipping_method: string;
    shipping_cost: number;
    payment_method: string;
    subtotal: number;
    tax: number;
    total: number;
    items: OrderItem[];
    user_id: string;
}


export async function createOrder(orderData: CreateOrderData) {
    try {
        const supabase = await createSupabaseServer();
        
        console.log('Creating order with data:', {
            ...orderData,
            items: orderData.items.length
        });

        const { data, error } = await supabase
            .from('orders')
            .insert([{
                ...orderData,
                status: 'pending',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) {
            console.error('Supabase error creating order:', error);
            throw new Error(`Failed to create order: ${error.message}`);
        }

        console.log('Order created successfully:', data.id);
        return data;
    } catch (error) {
        console.error('Error in createOrder action:', error);
        throw error;
    }
}

export async function getOrder(orderId: string) {
    try {
        const supabase = await createSupabaseServer();
        
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single();

        if (error) {
            console.error('Supabase error fetching order:', error);
            throw new Error(`Failed to fetch order: ${error.message}`);
        }

        return data;
    } catch (error) {
        console.error('Error in getOrder action:', error);
        throw error;
    }
}