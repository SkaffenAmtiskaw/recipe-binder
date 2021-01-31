import React, { FunctionComponent, useState } from 'react';
import { Autocomplete, FormField, TagInput as BaseTagInput } from 'evergreen-ui';

type Props = {
  options: string[],
  value: string[],
  onChange: (value: string[]) => void,
};

const TagInput: FunctionComponent<Props> = ({ options, value, onChange}) => {
  const [input, setInput] = useState('');

  return (
    <Autocomplete
      items={options}
      selectedItem={value}
      onChange={(item) => {
        onChange([...value, item]);
        setInput('');
      }}
    >
      {({ getInputProps, getRef }) => {
        const { value: inputValue, onChange: onInputChange, ...inputProps } = getInputProps();

        return (
          <FormField label="Tags">
            <BaseTagInput
              inputProps={{ value: input }}
              ref={getRef}
              separator=" "
              values={value}
              width="100%"
              onChange={(value) => {
                onChange(value);
                setInput('');
              }}
              onInputChange={(e) => {
                onInputChange(e);
                const element = e.currentTarget as HTMLInputElement;
                setInput(element.value);
              }}
              {...inputProps}
            />
          </FormField>
        )
      }}
    </Autocomplete>
  );
};

export default TagInput;
