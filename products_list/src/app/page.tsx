import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';

const HomePage = () => {
  return (
    <main className='mx-auto flex h-screen max-w-6xl flex-col items-center justify-center gap-10 p-5'>
      <h1>Products List</h1>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Description</CardDescription>

            <CardContent>
              <p>Card content</p>
            </CardContent>

            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </CardHeader>
        </Card>
      </div>
    </main>
  );
};

export default HomePage;
