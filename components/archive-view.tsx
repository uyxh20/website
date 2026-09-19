"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { archive, intro } from "@/lib/archive";
import { site } from "@/lib/site";

export function ArchiveView() {
  return (
    <div className="mx-auto w-full max-w-[860px] px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
        Background
      </p>
      <h1 className="mt-3 font-heading text-4xl tracking-tight sm:text-5xl">
        {intro.heading}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{intro.lede}</p>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-foreground/80">
        {intro.body}
      </p>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground italic">
        {intro.caption}
      </p>

      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Human insights</CardTitle>
          <CardDescription>{intro.insights}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <a
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            href={`mailto:${site.email}`}
          >
            Contact
          </a>
          <span className="text-muted-foreground">·</span>
          <a
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </CardContent>
      </Card>

      <Tabs defaultValue={archive[0]?.id} className="mt-12">
        <TabsList
          variant="line"
          className="h-auto w-full flex-wrap justify-start gap-1"
        >
          {archive.map((section) => (
            <TabsTrigger key={section.id} value={section.id} className="px-3">
              {section.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {archive.map((section) => (
          <TabsContent key={section.id} value={section.id} className="mt-6">
            <p className="mb-6 text-sm text-muted-foreground">{section.intro}</p>
            {section.projects.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Nothing published yet</CardTitle>
                  <CardDescription>
                    This slot was a placeholder on the previous Webflow site.
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="grid gap-4">
                {section.projects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{project.period}</Badge>
                      </div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription>{project.role}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      {project.fields.map((field) => (
                        <div key={field.label}>
                          <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                            {field.label}
                          </p>
                          <p className="mt-1 leading-6 text-foreground/85">
                            {field.value}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
