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
