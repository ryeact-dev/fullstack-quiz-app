import { Card, CardContent } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useGetAllSubjects } from '@/hooks/subject.hook';

const optionsCount = [
  { id: '0' },
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
];

export default function QuestionInputForm({ form, setOptions, options }) {
  const { data: listOfSubjects } = useGetAllSubjects(0, 100);

  const handleOptionChange = (index, value) => {
    setOptions((options) => {
      let newOptions = [...options];
      newOptions[index] = value;
      return newOptions;
    });
  };

  return (
    <Card className='rounded-md space-y-2'>
      <CardContent className='space-y-2 px-4'>
        <FormField
          control={form.control}
          name='question'
          render={({ field }) => (
            <FormItem className='flex-1 space-y-0'>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea
                  className='min-h-[70px] resize-none'
                  placeholder='Enter your question here...'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {optionsCount.map((item, index) => (
          <div key={index}>
            <Label className=''>{`Option: ${Number(item.id) + 1}`}</Label>
            <Textarea
              defaultValue={options[index] || ''}
              type='text'
              className='max-h-[70px] resize-none'
              placeholder='Enter option here...'
              onChange={(e) => handleOptionChange(item.id, e.target.value)}
            />
            {/* <Input
              defaultValue={options[index] || ''}
              className='mt-0'
              type='text'
              placeholder='Enter option here...'
              onChange={(e) => handleOptionChange(item.id, e.target.value)}
            /> */}
          </div>
        ))}

        <div className='flex items-center gap-4'>
          <FormField
            control={form.control}
            name='subjectId'
            render={({ field }) => (
              <FormItem className='flex-1 space-y-0 mt-2'>
                <FormLabel>Choose Subject</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Subject' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {listOfSubjects?.subjects?.map((item, index) => (
                      <SelectItem key={index} value={item.id}>
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='answer'
            render={({ field }) => (
              <FormItem className='flex-1 space-y-0 mt-2'>
                <FormLabel>Answer Key</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select Answer Key' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {optionsCount.map((item, index) => (
                      <SelectItem key={index} value={item.id}>
                        {Number(item.id) + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
