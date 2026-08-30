import Header from "@/src/components/layout/header";
import Footer from "@/src/components/layout/footer";
import LoadingBar from '@/src/components/layout/loading-bar';
import { UserContextProvider } from "@/src/contexts/user.context";
import { LoadingContextProvider } from '@/src/contexts/loading.context';

export default function Layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="body-wrapper">
            <LoadingContextProvider>
                <LoadingBar>
                    <UserContextProvider>
                        <Header />

                        <main className="main-content">
                            <div className="container">
                                {children}
                            </div>
                        </main>

                        <Footer />
                    </UserContextProvider>
                </LoadingBar>
            </LoadingContextProvider>
        </div>
    );
}
