'use client';
import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/components/ui/use-toast';
import { CommandList } from 'cmdk';

const instruments = [
  { label: 'Violão', value: 'guitar' },
  { label: 'Guitarra', value: 'guitarra' },
  { label: 'Bateria', value: 'bateria' },
  { label: 'Violino', value: 'violin' },
];

const guitarTechniques = [
  { id: 'hammerOn', label: 'Hammer on' },
  { id: 'percussaoComOPolegar', label: 'Percussão com o polegar' },
  { id: 'slide', label: 'Slide' },
  { id: 'fingerstyle', label: 'Fingerstyle' },
  { id: 'palmMute', label: 'Palm mute' },
  { id: 'bend', label: 'Bend' },
  { id: 'vibrato', label: 'Vibrato' },
];

const violinTechniques = [
  { id: 'detache', label: 'Detache' },
  { id: 'legato', label: 'Legato' },
  { id: 'staccato', label: 'Staccato' },
  { id: 'martele', label: 'Martelé' },
  { id: 'colLegno', label: 'Col Legno' },
];

const FormSchemaTechniques = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

const FormSchema = z.object({
  instrument: z.string({
    required_error: 'Por favor escolha seu instrumento.',
  }),
});

export default function Profile() {
  const { user, error, isLoading } = useUser();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [techniques, setTechniques] = useState<
    Array<{ id: string; label: string }>
  >([]);

  const formTechniques = useForm<z.infer<typeof FormSchemaTechniques>>({
    resolver: zodResolver(FormSchemaTechniques),
    defaultValues: {
      items: [],
    },
  });

  const formInstruments = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmitTechniques(data: z.infer<typeof FormSchemaTechniques>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  interface Instrument {
    value: string;
    label: string;
  }

  function onInstrumentSelect(instrument: Instrument) {
    formInstruments.setValue('instrument', instrument.value);
    switch (instrument.value) {
      case 'guitar':
        setTechniques(guitarTechniques);
        break;
      case 'violin':
        setTechniques(violinTechniques);
        break;
      default:
        setTechniques([]);
    }
    setPopoverOpen(false);
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex justify-center items-center">
        <p className="text-2xl font-bold">Perfil</p>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader className="flex flex-col items-center justify-center">
            {user && (
              <div className="flex flex-col items-center">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage
                    src={user.picture || undefined}
                    alt="User picture"
                  />
                  <AvatarFallback>
                    {/* <CircleUser className="h-5 w-5" /> */}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium leading-none mt-2">
                  Olá, {user.name}
                </p>
              </div>
            )}
          </CardHeader>

          <CardContent>
            {user && (
              <div className="grid gap-4">
                <p>
                  Nome: <span className="font-medium">{user.name}</span>
                </p>
                <p>
                  Email: <span className="font-medium">{user.email}</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center gap-2">
                <CardTitle>Instrumentos</CardTitle>
                <CardDescription>Escolha seu instrumento</CardDescription>
              </div>
            </CardHeader>
          </Card>

          <CardContent>
            <div className="mt-8">
              <Form {...formInstruments}>
                <form className="space-y-6">
                  <FormField
                    control={formInstruments.control}
                    name="instrument"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Popover
                          open={popoverOpen}
                          onOpenChange={setPopoverOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  'w-[200px] justify-between',
                                  !field.value && 'text-muted-foreground',
                                )}
                              >
                                {field.value
                                  ? instruments.find(
                                      (instrument) =>
                                        instrument.value === field.value,
                                    )?.label
                                  : 'Escolha um instrumento'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>

                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Procure o instrumento..." />
                              <CommandEmpty>
                                Instrumento não encontrado.
                              </CommandEmpty>
                              <CommandGroup>
                                <CommandList>
                                  {instruments.map((instruments) => (
                                    <CommandItem
                                      value={instruments.label}
                                      key={instruments.value}
                                      onSelect={() => {
                                        formInstruments.setValue(
                                          'instrument',
                                          instruments.value,
                                        );
                                        onInstrumentSelect(instruments);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          instruments.value === field.value
                                            ? 'opacity-100'
                                            : 'opacity-0',
                                        )}
                                      />
                                      {instruments.label}
                                    </CommandItem>
                                  ))}
                                </CommandList>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Quais Técnicas você já aprendeu?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Form {...formTechniques}>
                <form
                  onSubmit={formTechniques.handleSubmit(onSubmitTechniques)}
                  className="space-y-8"
                >
                  <FormField
                    control={formTechniques.control}
                    name="items"
                    render={() => (
                      <FormItem>
                        {techniques.map((technique) => (
                          <FormField
                            key={technique.id}
                            control={formTechniques.control}
                            name="items"
                            render={({ field }) => (
                              <FormItem
                                key={technique.id}
                                className="flex flex-row items-start space-x-3 space-y-0 mt-4"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(
                                      technique.id,
                                    )}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            technique.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== technique.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {technique.label}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Salvar</Button>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
