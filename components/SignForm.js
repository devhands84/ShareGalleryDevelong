import React, {useRef} from 'react';
import BorderedInput from './BorderedInput';

function SignForm({isSignUp, onSubmit, form, createChangeTextHandler}) {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <>
      <BorderedInput
        hasMarginBottom
        placeholder="Email"
        value={form.email}
        onChangeText={createChangeTextHandler('email')}
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="email"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <BorderedInput
        placeholder="Password"
        secureTextEntry
        hasMarginBottom={isSignUp}
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        ref={passwordRef}
        returnKeyType={isSignUp ? 'next' : 'done'}
        onSubmitEditing={() => {
          if (isSignUp) {
            confirmPasswordRef.current.focus();
          } else {
            onSubmit();
          }
        }}
      />
      {isSignUp && (
        <BorderedInput
          placeholder="Passwork check"
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={createChangeTextHandler('confirmPassword')}
          ref={confirmPasswordRef}
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        />
      )}
    </>
  );
}

export default SignForm;
