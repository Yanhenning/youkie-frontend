import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { SummarizationStyle } from '@/constants';

interface SelectSummarizeChoicesProps {
  selected: SummarizationStyle;
  onChange: (style: SummarizationStyle) => void;
  disabled?: boolean;
}

export default function SelectSummarizeChoices({
  selected,
  onChange,
  disabled = false
}: SelectSummarizeChoicesProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as SummarizationStyle;
    onChange(value);
  };

  return (
    <FormControl variant="outlined" size="small" sx={{ minWidth: 180 }}>
      <InputLabel id="summarization-style-label">Output style</InputLabel>
      <Select
        labelId="summarization-style-label"
        id="summarization-style"
        value={selected}
        onChange={handleChange}
        label="Output style"
        disabled={disabled}
      >
        <MenuItem value={SummarizationStyle.BULLET_POINTS}>Bullet Points</MenuItem>
        <MenuItem value={SummarizationStyle.BRIEF_TEXT}>Brief Text</MenuItem>
        <MenuItem value={SummarizationStyle.NORMAL}>Normal</MenuItem>
      </Select>
    </FormControl>
  );
}
