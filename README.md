<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe</title>
    <style>
        :root {
            --primary-color: #4f46e5;
            --secondary-color: #ef4444;
            --background-color: #f3f4f6;
            --card-background: #ffffff;
            --text-color: #1f2937;
            --hover-color: #e5e7eb;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, var(--background-color) 0%, #e5e7eb 100%);
        }

        .game-container {
            background: var(--card-background);
            padding: 2.5rem;
            border-radius: 1.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            position: relative;
            overflow: hidden;
        }

        .game-container::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(79, 70, 229, 0.1), transparent);
            animation: shine 10s infinite;
        }

        /* Animations */
        @keyframes shine {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        @keyframes glow {
            0% { text-shadow: 0 0 5px rgba(79, 70, 229, 0.5); }
            50% { text-shadow: 0 0 15px rgba(79, 70, 229, 0.8); }
            100% { text-shadow: 0 0 5px rgba(79, 70, 229, 0.5); }
        }

        .title {
            font-size: 2.5rem;
            color: var(--text-color);
            text-align: center;
            margin-bottom: 1.5rem;
            font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .status {
            font-size: 1.25rem;
            margin-bottom: 1.5rem;
            text-align: center;
            color: var(--text-color);
            font-weight: 500;
            animation: fadeIn 0.5s ease-in;
        }

        .board {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin-bottom: 1.5rem;
            animation: slideIn 0.5s ease-out;
        }

        .cell {
            width: 120px;
            height: 120px;
            background: linear-gradient(145deg, #ffffff, #f8fafc);
            border-radius: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            font-weight: 700;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .cell:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }

        .cell.x {
            color: var(--primary-color);
            animation: pulse 1s infinite;
        }

        .cell.o {
            color: var(--secondary-color);
            animation: pulse 1s infinite;
        }

        .winning-cell {
            animation: pulse 1s infinite;
        }

        .game-over {
            animation: glow 2s infinite;
        }

        .controls {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 1.5rem;
            animation: fadeIn 0.5s ease-in 0.5s;
        }

        button {
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 0.75rem;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            z-index: 1;
        }

        button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            z-index: -1;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }

        button:hover::before {
            transform: translateX(100%);
        }

        button.primary {
            background: var(--primary-color);
            color: white;
        }

        button.secondary {
            background: var(--secondary-color);
            color: white;
        }

        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 600px) {
            .game-container {
                padding: 1.5rem;
            }
            .cell {
                width: 100px;
                height: 100px;
                font-size: 2.5rem;
            }
            .title {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <div class="game-container">
        <div class="title">Tic Tac Toe</div>
        <div class="status">Player X's turn</div>
        <div class="board" id="board">
            <div class="cell" data-index="0"></div>
            <div class="cell" data-index="1"></div>
            <div class="cell" data-index="2"></div>
            <div class="cell" data-index="3"></div>
            <div class="cell" data-index="4"></div>
            <div class="cell" data-index="5"></div>
            <div class="cell" data-index="6"></div>
            <div class="cell" data-index="7"></div>
            <div class="cell" data-index="8"></div>
        </div>
        <div class="controls">
            <button class="primary">New Game</button>
        </div>
    </div>
    <script src="tic-tac-toe.js"></script>
</body>
</html>
