// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{generate_handler, Manager};

fn main() {
  tauri::Builder::default()
    .invoke_handler(generate_handler![greet])
    .invoke_handler(generate_handler![show_main_window])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

// remember to call `.manage(MyState::default())`
#[tauri::command]
fn greet(name: &str) ->  String {
  format!("Hello, {}", name)
}

#[tauri::command]
async fn show_main_window(window: tauri::Window) {
    window.get_window("main").unwrap().show().unwrap(); // replace "main" by the name of your window
}