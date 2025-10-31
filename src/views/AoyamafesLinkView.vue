<template>
  <div>Redirecting to pi-pi-room.vercel.app/works…</div>
</template>

<script>
export default {
  name: 'AoyamafesLinkView',
  mounted() {
    // 履歴を残さずリダイレクトする場合は replace を使用
    window.location.replace('https://pi-pi-room.vercel.app/works');
  }
}
</script>