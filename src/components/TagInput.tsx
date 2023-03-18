import {
  Autocomplete,
  TagInput as BaseTagInput,
  FormField,
} from 'evergreen-ui';
import { useState } from 'react';

import type { TagInputProps } from 'evergreen-ui';
import type { FunctionComponent } from 'react';

interface Props extends TagInputProps {
  description?: string;
  label?: string;
  max?: number;
  options: string[];
  restrict?: boolean;
  value: string[];
  onChange: (value: string[]) => void;
}

const TagInput: FunctionComponent<Props> = ({
  description,
  label,
  max,
  options,
  restrict,
  value,
  onChange,
  ...otherProps
}) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string>();

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
        const {
          value: inputValue,
          onBlur,
          onChange: onInputChange,
          ...inputProps
        } = getInputProps();

        return (
          <FormField
            description={description}
            label={label || ''}
            validationMessage={error}
          >
            <BaseTagInput
              inputProps={{ disabled: max === value.length, value: input }}
              ref={getRef}
              separator=" "
              values={value}
              width="100%"
              onAdd={(tags) => {
                const array = tags.filter((tag) => {
                  setError(undefined);
                  if (value.indexOf(tag) !== -1) {
                    setError(`Tag '${tag}' is already present.`);
                    return false;
                  } else if (restrict && options.indexOf(tag) === -1) {
                    setError(`Tag '${tag}' does not exist`);
                    return false;
                  }

                  return true;
                });
                onChange([...value, ...array]);
                setInput('');
              }}
              onRemove={(tag, index) => {
                setError(undefined);
                onChange([...value.slice(0, index), ...value.slice(index + 1)]);
              }}
              onInputChange={(e) => {
                setError(undefined);
                onInputChange(e);
                const element = e.currentTarget as HTMLInputElement;
                setInput(element.value);
              }}
              onBlur={(e) => {
                onBlur(e);
                setError(undefined);
              }}
              {...otherProps}
              {...inputProps}
            />
          </FormField>
        );
      }}
    </Autocomplete>
  );
};

export default TagInput;
