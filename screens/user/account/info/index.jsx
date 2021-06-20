import { useStore } from "./utils";

export function useInfo() {
  const {
    styles: {
      appStyles,
      inputsStyles: {
        containerStyles: inputsStyles,
        inputStyles: { containerStyles: inputStyles, placeholderColor },
      },
    },
    title,
    info,
    onChangeText,
    TextInput,
    SafeAreaView,
    FlatList,
    KeyboardAvoidingView,
  } = useStore();

  return (
    <SafeAreaView style={appStyles}>
      {title && (
        <KeyboardAvoidingView behavior="padding" style={appStyles}>
          <FlatList
            contentOffset={{ y: -1 }}
            contentContainerStyle={inputsStyles}
            data={info}
            renderItem={({
              item: { id, data, textContentType, keyboardType },
            }) => (
              <TextInput
                id={id}
                style={inputStyles}
                defaultValue={data}
                textContentType={textContentType}
                placeholderTextColor={placeholderColor}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
              />
            )}
          />
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
}
