/** Signal / Field style: a single editorial portfolio route with warm paper thematic tokens. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { NimbusCaseStudy, RozgarSyncCaseStudy, SpeechTherapyCaseStudy } from "./pages/CaseStudy";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/work/nimbus-keyboards" component={NimbusCaseStudy} />
      <Route path="/work/speech-therapy-project" component={SpeechTherapyCaseStudy} />
      <Route path="/work/rozgarsync" component={RozgarSyncCaseStudy} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
