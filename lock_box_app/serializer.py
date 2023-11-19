from rest_framework import serializers


# class dataShiftSerializer(serializers.Serializer):
#     plain_text = serializers.CharField(max_length=200)
#     cipher_text = serializers.CharField(max_length=200)
#     k = serializers.IntegerField(max_value=0, min_value=25)
#     list_plain_text = serializers.ListField()
# HACK

class dataShiftSerializer(serializers.Serializer):
    plain_text = serializers.CharField(max_length=200)
    cipher_text = serializers.CharField(max_length=200)
    k = serializers.IntegerField(max_value=0, min_value=94)
    list_plain_text = serializers.ListField()


class dataSubstitutionSerializer(serializers.Serializer):
    plain_text = serializers.CharField(max_length=200)
    cipher_text = serializers.CharField(max_length=200)
    k = serializers.CharField(max_length=26)
    list_attack = serializers.DictField(
        child=serializers.ListField(
            child=serializers.CharField()
        )
    )


class dataAffineSerializer(serializers.Serializer):
    plain_text = serializers.CharField(max_length=200)
    cipher_text = serializers.CharField(max_length=200)
    k = serializers.ListField(
        child=serializers.IntegerField()
    )


class dataVigenereSerializer(serializers.Serializer):
    plain_text = serializers.CharField(max_length=200)
    cipher_text = serializers.CharField(max_length=200)
    k = serializers.CharField(max_length=200)
    list_attack = serializers.DictField()


class dataSDESSerializer(serializers.Serializer):
    plain_text = serializers.CharField(max_length=200)
    cipher_text = serializers.CharField(max_length=200)
    k = serializers.IntegerField()


class dataRabinSerializer(serializers.Serializer):
    plain_text = serializers.CharField(max_length=200)
    cipher_text = serializers.CharField(max_length=200)
    n = serializers.IntegerField()
    p = serializers.IntegerField()
    q = serializers.IntegerField()


# Validador para Hill, hay dos funciones, para texto e imagen
class dataHillTextSerializer(serializers.Serializer):
    plain_text = serializers.CharField(max_length=200)
    cipher_text = serializers.CharField(max_length=200)
    k = serializers.ListField(
        child=serializers.ListField()
    )


class dataHillImgSerializer(serializers.Serializer):
    plain_img = serializers.FileField(max_length=None, allow_empty_file=True, required=False)
    cipher_img = serializers.FileField(max_length=None, allow_empty_file=True, required=False)
    k = serializers.CharField()
    method = serializers.CharField()


class TdesSerializer(serializers.Serializer):
    plain_img = serializers.FileField(max_length=None, allow_empty_file=True, required=False)
    cipher_img = serializers.FileField(max_length=None, allow_empty_file=True, required=False)
    k = serializers.CharField()
    mode = serializers.CharField()
    method = serializers.CharField()


class AesSerializer(serializers.Serializer):
    plain_img = serializers.FileField(max_length=None, allow_empty_file=True, required=False)
    cipher_img = serializers.FileField(max_length=None, allow_empty_file=True, required=False)
    k = serializers.CharField()
    mode = serializers.CharField()
    method = serializers.CharField()
