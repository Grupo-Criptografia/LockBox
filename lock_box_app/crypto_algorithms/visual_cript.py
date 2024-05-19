import numpy as np
from PIL import Image
from io import BytesIO
import base64


def encrypt_image(input_image_path):
    # Cargar la imagen y convertirla a escala de grises
    image = Image.open(input_image_path).convert('1')  # '1' para binarizar la imagen
    image_array = np.array(image)

    # Dimensiones de la imagen
    rows, cols = image_array.shape

    # Crear dos transparencias (shares)
    share1 = np.zeros((rows, cols), dtype=np.uint8)
    share2 = np.zeros((rows, cols), dtype=np.uint8)

    # Rellenar las transparencias
    for i in range(rows):
        for j in range(cols):
            pixel = image_array[i, j]
            if pixel == 0:  # Negro
                bit1, bit2 = np.random.randint(0, 2), np.random.randint(0, 2)
            else:  # Blanco
                bit1, bit2 = (np.random.randint(0, 2),) * 2  # Ambos bits deben ser iguales

            share1[i, j] = bit1
            share2[i, j] = bit2

    # Guardar las transparencias como imágenes
    share1_image = Image.fromarray(share1 * 255)
    share2_image = Image.fromarray(share2 * 255)

    share1_io = BytesIO()
    share2_io = BytesIO()
    share1_image.save(share1_io, format='PNG')
    share2_image.save(share2_io, format='PNG')

    share1_base64 = base64.b64encode(share1_io.getvalue()).decode('utf-8')
    share2_base64 = base64.b64encode(share2_io.getvalue()).decode('utf-8')

    return share1_base64, share2_base64


def decrypt_image(share_path1, share_path2):
    # Cargar las transparencias
    share1 = np.array(Image.open(share_path1).convert('1'))
    share2 = np.array(Image.open(share_path2).convert('1'))

    # Superponer las transparencias
    decrypted_image = np.logical_or(share1, share2).astype(np.uint8)

    # Guardar la imagen desencriptada
    decrypted_image = Image.fromarray(decrypted_image * 255)
    decrypted_io = BytesIO()
    decrypted_image.save(decrypted_io, format='PNG')
    decrypted_base64 = base64.b64encode(decrypted_io.getvalue()).decode('utf-8')

    return decrypted_base64


input_image_path = 'img/block/clear/animal.png'
output_share1_path = 'img/block/clear/share1.png'
output_share2_path = 'img/block/clear/share2.png'
decrypted_image_path = 'img/block/clear/decrypted_image.png'

# Ejemplo de uso
# encrypt_image(input_image_path)
# decrypt_image(output_share1_path, output_share2_path)
