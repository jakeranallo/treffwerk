"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { generateUserId, setUserId, getUserId } from "@/lib/auth"
import { useI18n } from "@/components/i18n-provider"

export function LoginForm() {
  const [uuid, setUuid] = useState("")
  const [newUuid, setNewUuid] = useState("")
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [createError, setCreateError] = useState("")
  const [createSuccess, setCreateSuccess] = useState("")
  const [activeTab, setActiveTab] = useState("login")
  const router = useRouter()
  const { t } = useI18n()

  useEffect(() => {
    // Check if user is already logged in
    const storedUuid = getUserId()
    if (storedUuid) {
      verifyUser(storedUuid)
    }
  }, [])

  // Clear errors when switching tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "login") {
      setCreateError("")
      setCreateSuccess("")
    } else {
      setLoginError("")
    }
  }

  const verifyUser = async (id: string) => {
    setLoading(true)
    setLoginError("")

    try {
      // In a real implementation, this would verify the user with the server
      // For now, we'll just set the user ID and redirect to the dashboard
      setUserId(id)
      router.push("/dashboard")
    } catch (err) {
      console.error("Login verification error:", err)
      setLoginError(t("auth.verificationFailed"))
    } finally {
      setLoading(false)
    }
  }

  const createUser = async () => {
    setLoading(true)
    setCreateError("")
    setCreateSuccess("")

    try {
      // Generate a new UUID
      const generatedUuid = generateUserId()

      // In a real implementation, this would register the user with the server
      // For now, we'll just set the new UUID
      setNewUuid(generatedUuid)
      setCreateSuccess(t("auth.keyCreated"))
    } catch (err) {
      console.error("Create user error:", err)
      setCreateError(t("auth.verificationFailed"))
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!uuid.trim()) {
      setLoginError(t("auth.enterKey"))
      return
    }
    verifyUser(uuid.trim())
  }

  const copyToClipboard = (textToCopy = newUuid) => {
    navigator.clipboard.writeText(textToCopy)
    setCreateSuccess(t("auth.keyCopied"))
  }

  return (
    <Card className="w-full max-w-md border-slate-800 bg-slate-900 text-slate-50">
      <CardHeader className="space-y-1 items-center">
        <div className="flex items-center justify-center mb-1 mt-2">
          <Logo className="mb-0" />
        </div>
        <CardDescription className="text-slate-400">{t("auth.loginTitle")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="login" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">{t("common.login")}</TabsTrigger>
            <TabsTrigger value="create">{t("auth.createKeyTitle")}</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="uuid"
                    type="password"
                    placeholder={t("auth.enterKey")}
                    value={uuid}
                    onChange={(e) => setUuid(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-slate-100"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("auth.verifying")}
                    </>
                  ) : (
                    t("common.login")
                  )}
                </Button>

                {loginError && (
                  <Alert className="mt-4 bg-red-900/30 border-red-800 text-red-200">
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                )}
              </div>
            </form>
          </TabsContent>

          <TabsContent value="create">
            <div className="space-y-4">
              {newUuid ? (
                <div className="space-y-4">
                  <Alert className="bg-slate-800 border-slate-700">
                    <AlertDescription
                      className="break-all font-mono text-primary cursor-pointer"
                      onClick={() => copyToClipboard()}
                    >
                      {newUuid}
                    </AlertDescription>
                  </Alert>
                  <Button onClick={() => copyToClipboard()} className="w-full bg-slate-800 hover:bg-slate-700">
                    {t("auth.copyKey")}
                  </Button>
                  <Button onClick={() => setActiveTab("login")} className="w-full bg-primary hover:bg-primary/90">
                    {t("auth.proceedToLogin")}
                  </Button>
                </div>
              ) : (
                <Button onClick={createUser} className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("auth.creating")}
                    </>
                  ) : (
                    t("auth.generateKey")
                  )}
                </Button>
              )}

              {createError && (
                <Alert className="mt-4 bg-red-900/30 border-red-800 text-red-200">
                  <AlertDescription>{createError}</AlertDescription>
                </Alert>
              )}

              {createSuccess && !createError && (
                <Alert className="mt-4 bg-green-900/30 border-green-800 text-green-200">
                  <AlertDescription>{createSuccess}</AlertDescription>
                </Alert>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
