import numpy as np
from PIL import Image
from io import BytesIO
import pywt
import base64


def dwt2(image):
    coeffs = pywt.dwt2(image, 'haar')
    LL, (LH, HL, HH) = coeffs
    return LL, LH, HL, HH


def idwt2(coeffs):
    return pywt.idwt2(coeffs, 'haar')


def add_watermark_w(input_image_path, watermark_image_path, alpha=0.1):
    # Abrir la imagen original y la marca de agua
    original_image = Image.open(input_image_path).convert('L')
    watermark_image = Image.open(watermark_image_path).convert('L')

    original_array = np.array(original_image, dtype=np.float32)

    # Aplicar DWT a la imagen original
    LL, LH, HL, HH = dwt2(original_array)

    # Redimensionar la marca de agua para que coincida con las dimensiones de la sub-banda HH
    watermark_resized = watermark_image.resize(HH.shape[::-1])

    # Convertir las imágenes a arrays numpy
    LL_array = np.array(LL, dtype=np.float32)
    LH_array = np.array(LH, dtype=np.float32)
    HL_array = np.array(HL, dtype=np.float32)
    HH_array = np.array(HH, dtype=np.float32)
    watermark_array = np.array(watermark_resized, dtype=np.float32)

    # Insertar la marca de agua en la sub-banda HH
    HH_array += alpha * watermark_array

    # Reconstruir la imagen utilizando la inversa de DWT
    watermarked_image = idwt2((LL_array, (LH_array, HL_array, HH_array)))

    # Asegurar que los valores estén en el rango válido para imágenes
    watermarked_image = np.clip(watermarked_image, 0, 255)

    # Convertir la matriz resultante a un objeto de imagen y guardarla
    watermarked_image = Image.fromarray(watermarked_image.astype(np.uint8))

    watermarked_io = BytesIO()
    watermarked_image.save(watermarked_io, format='PNG')

    watermarked_image_base64 = base64.b64encode(watermarked_io.getvalue()).decode('utf-8')

    return watermarked_image_base64


def extract_watermark_w(input_image_path, alpha=0.1):
    # Abrir la imagen con la marca de agua y la imagen original
    watermarked_image = Image.open(input_image_path).convert('L')

    # Aplicar DWT a la imagen con la marca de agua y la imagen original
    LL_w, LH_w, HL_w, HH_w = dwt2(watermarked_image)

    # Extraer la sub-banda HH con la marca de agua incrustada
    watermark_array = (HH_w - alpha * np.array(LL_w, dtype=np.float32)) / alpha

    # Asegurar que los valores estén en el rango válido para imágenes
    watermark_array = np.clip(watermark_array, 0, 255)

    watermarked_image = Image.fromarray(watermark_array.astype(np.uint8))

    # Guardar la marca de agua extraída
    watermarked_io = BytesIO()
    watermarked_image.save(watermarked_io, format='PNG')
    watermarked_image_base64 = base64.b64encode(watermarked_io.getvalue()).decode('utf-8')

    return watermarked_image_base64


# Uso de ejemplo
"""add_watermark_w(
    input_image_path='img/block/clear/tree.png',
    watermark_image_path='img/block/clear/bw.png',
    output_image_path='img/block/clear/img_watermark.png',
    alpha=0.1
)

extract_watermark_w(
    input_image_path='img/block/clear/img_watermark.png',
    output_image_path='img/block/clear/extracted_watermark.png',
    alpha=0.1
)"""
