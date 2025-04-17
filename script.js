function toggleTheme() {
    const body = document.body;
    const fade = document.getElementById('themeFade');
  
    fade.style.opacity = '0.5';
  
    setTimeout(() => {
      body.classList.toggle('dark');
  
      const isDark = body.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
  
      document.getElementById('circle').innerHTML = isDark ? '☀️' : '🌙';
  
      fade.style.opacity = '0';
    }, 200);
  }

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      document.getElementById('circle').innerHTML = '☀️';
    }
});  

console.log(history);
console.log("Тема: " + localStorage.getItem('theme'));