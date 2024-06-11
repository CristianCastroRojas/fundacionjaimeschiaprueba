<?php
$config = require __DIR__ . '/config.php';

$recaptcha_secret = $config['recaptcha_secret'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['g-recaptcha-response'])) {
        $recaptcha_response = $_POST['g-recaptcha-response'];

        $url = 'https://www.google.com/recaptcha/api/siteverify';
        $data = [
            'secret' => $recaptcha_secret,
            'response' => $recaptcha_response
        ];

        $options = [
            'http' => [
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'method' => 'POST',
                'content' => http_build_query($data)
            ]
        ];

        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        $result_json = json_decode($result);

        if ($result_json && $result_json->success) {
            // Verificación de reCAPTCHA exitosa
            if (!empty($_POST['nombre']) && !empty($_POST['email']) && !empty($_POST['celular']) && !empty($_POST['mensaje'])) {
                // Conexión a la base de datos
                $servername = $config['database']['servername'];
                $username = $config['database']['username'];
                $password = $config['database']['password'];
                $database = $config['database']['database'];

                // Verificar la conexión
                $conn = new mysqli($servername, $username, $password, $database);
                if ($conn->connect_error) {
                    die("Conexión fallida: " . $conn->connect_error);
                }

                // Sanitizar y validar los datos del formulario
                $nombre = mysqli_real_escape_string($conn, $_POST['nombre']);
                $apellido = isset($_POST['apellido']) ? mysqli_real_escape_string($conn, $_POST['apellido']) : '';
                $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) ? $_POST['email'] : '';
                $celular = mysqli_real_escape_string($conn, $_POST['celular']);
                $tipo_documento = isset($_POST['tipo_documento']) ? mysqli_real_escape_string($conn, $_POST['tipo_documento']) : '';
                $documento = isset($_POST['documento']) ? mysqli_real_escape_string($conn, $_POST['documento']) : '';
                $ciudad = isset($_POST['ciudad']) ? mysqli_real_escape_string($conn, $_POST['ciudad']) : '';
                $direccion = isset($_POST['direccion']) ? mysqli_real_escape_string($conn, $_POST['direccion']) : '';
                $interes = isset($_POST['interes']) ? mysqli_real_escape_string($conn, $_POST['interes']) : '';
                $mensaje = mysqli_real_escape_string($conn, $_POST['mensaje']);

                // Preparar la consulta SQL para insertar los datos en la tabla
                $sql = "INSERT INTO usuarios (nombre, apellido, email, celular, tipo_documento, documento, ciudad, direccion, interes, mensaje) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ssssssssss", $nombre, $apellido, $email, $celular, $tipo_documento, $documento, $ciudad, $direccion, $interes, $mensaje);

                if ($stmt->execute()) {
                    // Redirigir a la página de agradecimiento
                    header("Location: ../public/registro_completado.html");
                    exit();
                } else {
                    echo "<p>Error al almacenar los datos. Por favor, inténtalo de nuevo más tarde.</p>";
                }

                // Cerrar la conexión
                $stmt->close();
                $conn->close();
            } else {
                echo "<p>Error: Todos los campos requeridos deben estar llenos.</p>";
            }
        } else {
            echo "<p>Error: reCAPTCHA no verificado. Por favor, verifica que eres humano.</p>";
        }
    } else {
        echo "<p>Error: No se ha recibido respuesta de reCAPTCHA.</p>";
    }
}
?>



