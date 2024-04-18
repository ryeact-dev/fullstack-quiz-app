import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function SelectSubject({
  subject,
  listOfSubjects,
  handleSelectChange,
}) {
  return (
    <Select
      value={subject === 'undefined' ? '' : subject}
      onValueChange={handleSelectChange}
    >
      <SelectTrigger className='w-[250px]'>
        <SelectValue placeholder='Select Subject' />
      </SelectTrigger>
      <SelectContent>
        {listOfSubjects?.subjects?.map((subject) => (
          <SelectItem key={subject.id} value={subject.id}>
            {subject.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
