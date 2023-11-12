from rest_framework import serializers


class dataShiftSerializer(serializers.Serializer):
    plain_text = serializers.CharField(max_length=200)
    cipher_text = serializers.CharField(max_length=200)
    k = serializers.IntegerField(max_value=0, min_value=25)
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


class dataHillSerializer(serializers.Serializer):
    plain_text = serializers.CharField(max_length=200)
    cipher_text = serializers.CharField(max_length=200)
    k = serializers.ListField(
        child=serializers.ListField()
    )


class dataTDESSerializer(serializers.Serializer):
    plain_img = serializers.ImageField(allow_empty_file=True)
    cipher_img = serializers.ImageField(allow_empty_file=True)
    k = serializers.CharField()
    method = serializers.CharField()
    mode = serializers.CharField()
