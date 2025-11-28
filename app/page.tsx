import Link from "next/link"
import { ArrowRight, Newspaper, Users, Bell, Zap, Heart, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Newspaper className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">TDMU Feeds</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Tính năng
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Giới thiệu
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button size="sm" asChild>
              <Link href="/feeds">
                Bắt đầu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Cập nhật tin tức mới nhất từ TDMU
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance">
              Tổng hợp tin tức
              <span className="block text-primary mt-2">Đại học Thủ Dầu Một</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl text-pretty">
              Nền tảng tổng hợp tin tức từ các câu lạc bộ, tổ chức và đoàn thể trong trường. Không bỏ lỡ bất kỳ sự kiện
              hay thông tin quan trọng nào.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4  z-10">
              <Button size="lg" className="w-full sm:w-auto px-8 z-2" asChild>
                <Link href="/feeds">
                  Xem ngay
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto z-2 px-8 bg-transparent" asChild>
                <Link href="#features">Tìm hiểu thêm</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10+", label: "Câu lạc bộ" },
              { value: "50+", label: "Bài viết" },
              { value: "10+", label: "Sinh viên" },
              { value: "24/7", label: "Cập nhật" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Tính năng nổi bật</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Mọi thứ bạn cần để theo dõi tin tức và sự kiện trong trường
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Newspaper,
                title: "Tổng hợp tin tức",
                description: "Tự động thu thập tin tức từ các fanpage và trang chính thức của câu lạc bộ.",
              },
              {
                icon: Bell,
                title: "Thông báo thông minh",
                description: "Nhận thông báo khi có tin tức mới từ các câu lạc bộ bạn yêu thích.",
              },
              {
                icon: Heart,
                title: "Yêu thích & Lưu trữ",
                description: "Lưu lại các bài viết quan trọng để đọc sau hoặc chia sẻ với bạn bè.",
              },
              {
                icon: Users,
                title: "Cộng đồng đa dạng",
                description: "Kết nối với hơn 10 câu lạc bộ và tổ chức trong trường.",
              },
              {
                icon: Zap,
                title: "Cập nhật nhanh chóng",
                description: "Tin tức được cập nhật liên tục, đảm bảo bạn không bỏ lỡ điều gì.",
              },
              {
                icon: Globe,
                title: "Truy cập mọi nơi",
                description: "Giao diện tối ưu cho mọi thiết bị, từ điện thoại đến máy tính.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

 
      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 md:px-16 md:py-24">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Sẵn sàng khám phá?
              </h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Tham gia ngay để không bỏ lỡ bất kỳ tin tức nào từ các câu lạc bộ yêu thích của bạn.
              </p>
              <div className="mt-8">
                <Button size="lg" variant="secondary" className="px-8" asChild>
                  <Link href="/feeds">
                    Xem ngay
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                  <Newspaper className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">TDMU Feeds</span>
              </div>
              <p className="text-muted-foreground max-w-md">
                Nền tảng tổng hợp tin tức từ các câu lạc bộ và tổ chức thuộc Đại học Thủ Dầu Một. Giúp sinh viên cập
                nhật thông tin nhanh chóng và tiện lợi.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Liên kết</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/feeds" className="hover:text-foreground transition-colors">
                    Tin tức
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="hover:text-foreground transition-colors">
                    Tính năng
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Liên hệ</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Info coming soon... </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2025 TDMU Feeds. Phát triển bởi sinh viên TDMU.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
