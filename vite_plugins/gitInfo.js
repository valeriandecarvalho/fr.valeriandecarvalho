import { execSync } from 'child_process'

export default function gitInfo() {
    return {
        name: 'git-info',
        config(config, { command }) {
            const defineGitEnv = (message, date) => {
                config.define = {
                    ...config.define,
                    'import.meta.env.VITE_GIT_COMMIT_MESSAGE': JSON.stringify(message),
                    'import.meta.env.VITE_GIT_COMMIT_DATE': JSON.stringify(date),
                }
            }
            if (command === 'build') {
                try {
                    const msg = execSync('git log -1 --pretty=%s origin/portfolio', { encoding: 'utf8' }).trim()
                    const rawDate = execSync('git log -1 --pretty=%cd --date=iso origin/portfolio', { encoding: 'utf8' }).trim()
                    const date = new Date(rawDate).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })
                    defineGitEnv(msg, date)
                } catch (e) {
                    console.warn('⚠️ Git info not found:', e.message)
                    defineGitEnv('', '')
                }
            } else {
                defineGitEnv('', '')
            }
        }
    }
}