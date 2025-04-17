const display = document.getElementById('display');
const historyBox = document.getElementById('history');
let history;
let currentExpression = '';

if (localStorage.getItem('saved')) {
    history = JSON.parse(localStorage.getItem('saved'));
} else {
    history = [];
}

function updateDisplayForUser(expression) {
    return expression.replace(/sqrt\(/g, '√(');
}

function appendValue(value) {
    if (display.value === 'Ошибка') {
        display.value = '';
    }
    currentExpression += value;
    display.value = updateDisplayForUser(currentExpression);
}

function clearDisplay() {
    display.value = '';
    currentExpression = '';
}

function deleteLast() {
    if (display.value === 'Ошибка') {
        display.value = '';
    }
    currentExpression = currentExpression.slice(0, -1);
    display.value = updateDisplayForUser(currentExpression);
}

function calculate() {
    if (currentExpression != "") {
        try {
            const expression = display.value;
            const result = math.evaluate(currentExpression);
            display.value = result;
            addToHistory(expression, result);
        } catch {
            display.value = 'Ошибка';
            currentExpression = '';
        }
    }
}

function renderHistory() {
    historyBox.innerHTML = '';
    history.forEach(function(element, index) {
        const div = document.createElement('div');

        const textSpan = document.createElement('span');
        textSpan.innerHTML = index + 1 + " | " + element;
        textSpan.onclick = () => {
            display.value = element.split('=')[0].trim();
        };

        const span = document.createElement('span');
        span.innerHTML = "❌";
        span.className = "del";
        span.onclick = () => {
            deleteHistoryItem(index);
        }

        div.append(textSpan);
        div.append(span);
        historyBox.appendChild(div);
    });
}

function deleteHistoryItem(index) {
    history.splice(index, 1);
    localStorage.setItem('saved', JSON.stringify(history));
    renderHistory();
}

function addToHistory(expression, result) {
    if (expression != result) {
        const entry = `${expression} = ${result}`;
        history.push(entry);
        localStorage.setItem('saved', JSON.stringify(history));
  
        renderHistory();
    }
}

document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (key === ' ') {
        event.preventDefault();
        return;
    }

    if (!isNaN(key) || '+-*/^().'.includes(key)) {
        appendValue(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape' || key.toLowerCase() === 'c' || key.toLowerCase() === 'с') {
        clearDisplay();
    }
});

function toggleTheme() {
    const body = document.body;
    const fade = document.getElementById('themeFade');
    const circle = document.getElementById('circle');
  
    fade.style.opacity = '0.4';
  
    setTimeout(() => {
      body.classList.toggle('dark');
      const isDark = body.classList.contains('dark');
  
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
  
      if (isDark) {
        circle.style.left = '32px';
        circle.textContent = '☀️';
      } else {
        circle.style.left = '2px';
        circle.textContent = '🌙';
      }
  
      fade.style.opacity = '0';
    }, 150);
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        circle.style.left = '32px';
        document.getElementById('circle').textContent = '☀️';
    }
});  

console.log(history);
console.log("Тема: " + localStorage.getItem('theme'));

renderHistory();