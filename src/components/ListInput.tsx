import React, { FormEvent, FunctionComponent, useEffect } from 'react';
import { CrossIcon, IconButton, Pane, PlusIcon, TextareaField, TextInputField, majorScale } from 'evergreen-ui';

import replace from '@utils/replace';

type Props = {
  label: string,
  textarea?: boolean,
  value: string[],
  onChange: (value: string[]) => void,
}

const ListInput: FunctionComponent<Props> = ({ label, textarea, value, onChange }) => {
  useEffect(() => {
    // If the array is empty, initialize the list with an empty text input so it's not confusing to the user.
    if (!value.length) {
      onChange([''])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Pane marginBottom={majorScale(2)}>
      {value.map((line, idx) => (
        <Pane alignItems="flex-end" display="flex" key={idx} marginBottom={majorScale(1)} width="100%">
          {
            textarea ? (
              <TextareaField
                flex={1}
                label={idx === 0 ? label : ''}
                marginBottom={0}
                value={value[idx]}
                onChange={(e: FormEvent<HTMLTextAreaElement>) => {
                  onChange(replace(value, e.currentTarget.value, idx))
                }}
              />
            ) : (
              <TextInputField
                flex={1}
                label={idx === 0 ? label : ''}
                marginBottom={0}
                value={value[idx]}
                onChange={(e: FormEvent<HTMLInputElement>) => {
                  onChange(replace(value, e.currentTarget.value, idx))
                }}
              />
            )
          }

          <IconButton
            appearance="minimal"
            icon={CrossIcon}
            marginLeft={majorScale(1)}
            onClick={() => {
              onChange([...value.slice(0, idx), ...value.slice(idx + 1, value.length)])
            }}
          />
        </Pane>
      ))}
      <IconButton
        appearance="minimal"
        icon={PlusIcon}
        onClick={() => {
          onChange([...value, ''])
        }}
      />
    </Pane>
  );
};

export default ListInput;
