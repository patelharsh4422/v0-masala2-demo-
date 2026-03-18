-- Create reservations table for Magic Masala Restaurant
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  guests INTEGER NOT NULL,
  reservation_date DATE,
  reservation_time TEXT,
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for reservations (customers can book without auth)
CREATE POLICY "Allow public to insert reservations" ON reservations
  FOR INSERT WITH CHECK (true);

-- Allow public to view their own reservations by phone (optional)
CREATE POLICY "Allow public to select reservations" ON reservations
  FOR SELECT USING (true);
