import {Tables} from '@/types/supabase.ts';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/ui/tabs.tsx';

import Players from './Players';

interface Props {
  club: Tables<'clubs'>;
}

export default function Tab({club}: Props) {
  return (
    <Tabs defaultValue="players" className="flex flex-col items-center">
      <TabsList className="max-w-max">
        <TabsTrigger value="players">Players</TabsTrigger>
        <TabsTrigger value="games">Games</TabsTrigger>
        <TabsTrigger value="rating">Rating</TabsTrigger>
        <TabsTrigger value="admins">Admins</TabsTrigger>
      </TabsList>
      <TabsContent value="players" className="w-full">
        <Players club_id={club.id} />
      </TabsContent>
      <TabsContent value="games" className="w-full">
        games
      </TabsContent>
      <TabsContent value="rating" className="w-full">
        rating
      </TabsContent>
      <TabsContent value="admins" className="w-full">
        admins
      </TabsContent>
    </Tabs>
  );
}