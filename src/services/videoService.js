import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://lbcxxojwabghsjyaqdeh.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiY3h4b2p3YWJnaHNqeWFxZGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0MzcwMTksImV4cCI6MTk4NDAxMzAxOX0.9yGzDFu0Q5SaP3x7UG5GClOlR984wamzEX0HSQ69oxo";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*");
        }
    }
}