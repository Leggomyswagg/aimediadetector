import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://ouvodflokvispuvoczey.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImVmODg5YmRhLWY5NDItNGRhYS1iMmU0LTViYTM3ZjljM2FlOCJ9.eyJwcm9qZWN0SWQiOiJvdXZvZGZsb2t2aXNwdXZvY3pleSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzczMTg0NTE1LCJleHAiOjIwODg1NDQ1MTUsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.8sC66rxTIn5Uamic7yYcq43RiY4VyMhS7oS8jvl1bTA';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };