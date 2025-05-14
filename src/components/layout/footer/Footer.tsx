"use client";

import Link from "next/link";

import { ROUTE } from "@/config/route.config";

export function Footer() {
  return (
    <footer className="relative mt-5 border-t text-foreground">
      <div className="md:px -6 container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Свяжитесь с нами
            </h2>
            <p className="mb-6 text-muted-foreground">
              Присоединяйтесь к нашей рассылке для получения последних
              обновлений и специальных предложений.
            </p>
          </div>
          <div className="justify-self-center text-center">
            <h3 className="mb-4 text-lg font-semibold">Навигация</h3>
            <nav className="space-y-2 text-sm">
              <Link
                href={ROUTE.home}
                className="block transition-colors hover:text-primary"
              >
                Главная
              </Link>
              <Link
                href={"#"}
                className="block transition-colors hover:text-primary"
              >
                О нас
              </Link>
              <Link
                href={ROUTE.menu()}
                className="block transition-colors hover:text-primary"
              >
                Меню
              </Link>
              {/* <a href='#' className='block transition-colors hover:text-primary'>
								Products
							</a> */}
              <a
                href="#"
                className="block transition-colors hover:text-primary"
              >
                Контакты
              </a>
            </nav>
          </div>
          <div className="justify-self-center">
            <h3 className="mb-4 text-lg font-semibold">Наши контакты</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>123 Innovation Street</p>
              <p>Tech City, TC 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: kovinskiymagictate.store</p>
            </address>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 Magic Taste. Все права защищены.
          </p>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="transition-colors hover:text-primary">
              Политика конфиденциальности
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Условия использования
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Политика использования файлов cookie
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
