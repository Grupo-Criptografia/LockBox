import base64
import io
from io import BytesIO
from string import ascii_lowercase
import numpy as np
from PIL import Image

# char to int
char2int = {x: idx for idx, x in enumerate(ascii_lowercase)}
# int to char
int2char = {idx: x for idx, x in enumerate(ascii_lowercase)}

# probabilty density function of the letter in the alphabet
probs = [
    0.082,
    0.015,
    0.028,
    0.043,
    0.127,
    0.022,
    0.02,
    0.061,
    0.07,
    0.002,
    0.008,
    0.04,
    0.024,
    0.067,
    0.075,
    0.019,
    0.001,
    0.06,
    0.063,
    0.091,
    0.028,
    0.01,
    0.023,
    0.001,
    0.02,
    0.001,
]


def str2int(plain_text: str) -> list[int]:
    """
    Convertir de string a int.

    Codificación:
    enumeración del alfabeto en ingles
    """
    return [char2int[l] for l in plain_text]


def int2str(integer_text: list[int]) -> str:
    """
    Convertir int a string

    Invierte la codificacion de str2int
    """
    return "".join([int2char[l] for l in integer_text])


def pad_image_arr(img_arr, block_size):
    shape = img_arr.shape
    num_pad_rows = block_size - (shape[0] % block_size)
    pad_shape = (num_pad_rows,) + shape[1:]
    pad = np.full(pad_shape, num_pad_rows, dtype=np.uint8)
    padded_arr = np.vstack((img_arr, pad))

    return padded_arr


def unpad_image_arr(img_arr):
    if len(img_arr.shape) == 3:
        num_pad_rows = int(img_arr[-1, -1, -1])
        plain_img_arr = img_arr[:-num_pad_rows, :, :]
    else:
        num_pad_rows = int(img_arr[-1, -1])
        plain_img_arr = img_arr[:-num_pad_rows, :]

    return plain_img_arr


def pad_image(image, block_size):
    width, height = image.size
    pad_rows = block_size - (height % block_size)

    # Create a new image with padding
    if pad_rows < block_size:
        padded_image = Image.new(image.mode, (width, height + pad_rows), color=(255, 255, 255))
        padded_image.paste(image, (0, 0))
        return padded_image
    else:
        return image


def unpad_image(image):
    width, height = image.size

    # Find and remove the padding
    for row in range(height - 1, -1, -1):
        if all(pixel == 255 for pixel in image.getpixel((0, row))):
            height -= 1
        else:
            break

    return image.crop((0, 0, width, height))


def convert_img_base64(image):
    image = Image.open(image)
    image_bytes = BytesIO()
    image.save(image_bytes, format='PNG')
    return base64.b64encode(image_bytes.getvalue()).decode('utf-8')


def convert_pil_image_to_base64(pil_image):
    # Convert the PIL Image to bytes
    with BytesIO() as image_bytes:
        pil_image.save(image_bytes, format='PNG')
        image_bytes = image_bytes.getvalue()

    # Encode the image bytes as a base64-encoded string
    base64_encoded_image = base64.b64encode(image_bytes).decode('utf-8')

    return base64_encoded_image
