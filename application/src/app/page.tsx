export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <header className="py-8">
        <h1 className="text-3xl font-bold">Welcome to Anzygo</h1>
        <p className="mt-2 text-lg">Communication - reimagined</p>
      </header>
      <main className="flex flex-col items-center gap-4">
        <p>Get started by exploring our features:</p>
        <ul className="list-disc list-inside">
          <li>Create and join chats</li>
          <li>Customize your profile</li>
          <li>Enjoy seamless communication</li>
        </ul>
      </main>
      <footer className="mt-auto py-4">
        <p>&copy; {new Date().getFullYear()} Anzygo. All rights reserved.</p>
      </footer>
    </div>
  );
}

