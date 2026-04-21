<?php 
define("APPURL","http://localhost/CMSC126/cmsc126_FixItUP");
?>

<!DOCTYPE html>
<head>
    <title>FixItUP</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body>
    <div>
        <header>
            <nav class="flex items-center justify-between px-10 py-6 bg-white shadow-sm">
                <a href="#" class="text-xl font-bold text-gray-800">
                    FixItUP
                </a>

                <div class="flex items-center gap-10 text-sm font-medium text-gray-600">
                    <a href="about.php" class="hover:text-black">About Us</a>
                    <a href="features.php" class="hover:text-black">Features</a>
                </div>

                <div class="text-sm font-medium text-gray-800">
                    <?php 
                    if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] == true) {
                        echo '<a href="logout.php" class="hover:underline text-red-600">Log Out</a>';
                    } else {
                        echo '<a href="login.php" class="hover:underline">Log In & Sign Up</a>';
                    }
                    ?>
                </div>
            </nav>
        </header>
    </div>
</body>
</html>