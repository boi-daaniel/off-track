import { supabase } from './supabaseClient'

export async function createAllowance({ userId, amount, frequency }) {
  const { data, error } = await supabase
    .from('allowances')
    .insert({
      user_id: userId,
      amount,
      frequency,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function createExpense({ userId, amount, category, description }) {
  const { data, error } = await supabase
    .from('expenses')
    .insert({
      user_id: userId,
      amount,
      category,
      description,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function getExpenses(userId) {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data ?? []
}

export async function getAllowances(userId) {
  const { data, error } = await supabase
    .from('allowances')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data ?? []
}
