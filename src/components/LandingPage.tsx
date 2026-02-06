import { Button } from "@/components/ui/button";
import { Header } from "@/components/common/Header";
import manageMoneyImg from "@/assets/Manage money-bro.png";
import savingMoneyImg from "@/assets/Saving money-bro.png";

interface LandingPageProps {
  onLogin: () => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header>
        <Button variant="ghost" onClick={onLogin}>
          Login
        </Button>
        <Button onClick={onLogin}>Start now</Button>
      </Header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container min-h-screen mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col justify-center space-y-8 animate-in fade-in slide-in-from-left duration-1000">
              <div className="space-y-4">
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                  Control your <span className="text-primary">Money</span>{" "}
                  Wisely
                </h2>
                <p className="max-w-xl text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The simple and powerful tool to manage your budget, track your
                  expenses and achieve financial freedom.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="px-8 text-lg font-semibold"
                  onClick={onLogin}
                >
                  Start now
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center animate-in fade-in zoom-in duration-1000 delay-200">
              <img
                src={manageMoneyImg}
                alt="Manage Money Illustration"
                className="w-full max-w-lg object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-20 bg-secondary/30 backdrop-blur-sm border-y">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="order-2 lg:order-1 flex items-center justify-center animate-in fade-in slide-in-from-left duration-1000">
                <img
                  src={savingMoneyImg}
                  alt="Saving Money Illustration"
                  className="w-full max-w-lg object-contain drop-shadow-xl"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-8 animate-in fade-in slide-in-from-right duration-1000">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">
                    Simplicity in <span className="text-primary">Control</span>
                  </h2>
                  <p className="text-muted-foreground md:text-lg">
                    Visualize where each cent goes. Our intuitive interface
                    allows you to focus on what really matters: saving for your
                    dreams.
                  </p>
                </div>
                <ul className="grid gap-4">
                  {[
                    "Automatic Expense Categorization",
                    "Real-time Tracking",
                    "Intuitive Visualization",
                    "Secure and Fast Access",
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <svg
                          className=" h-4 w-4"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-foreground font-medium">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="container mx-auto px-4 py-20 text-center space-y-8">
          <div className="flex flex-col items-center justify-center space-y-4 animate-in fade-in slide-in-from-bottom duration-1000">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
              Ready to transform your financial life?
            </h2>
            <p className="max-w-2xl text-muted-foreground md:text-xl">
              Join us today and start managing your budget professionally.
            </p>
            <Button
              size="lg"
              variant="default"
              className="mt-8 px-12 py-6 text-xl rounded-full shadow-lg hover:shadow-primary/30 transition-all"
              onClick={onLogin}
            >
              Login with Google
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
